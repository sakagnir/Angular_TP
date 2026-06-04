import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavorisService } from '../../services/favoris-service';
import { CharacterService } from '../../services/character-service';
import { Character } from '../../models/character.model';
import { Info } from '../../models/info.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersListComponent {
  protected favoris = inject(FavorisService);
  private characterService = inject(CharacterService);
  
  characters = signal<Character[]>([]);
  pageMax = 0;
  status = ['alive', 'dead', 'unknown'];
  selectedFilter = "";

  loading = signal(true);
  error = signal<string | null>(null);
  pageCourante = signal(1);
  recherche = '';

  ngOnInit() { this.charger(); }

  charger() {
    this.loading.set(true);
    this.error.set(null);

    this.characterService.getAll(this.pageCourante(), this.recherche, this.selectedFilter).subscribe({
      next: data => {
        this.characters.set(data.results);
        this.pageMax = data.info.pages;
        this.loading.set(false)
      },
      error: () => {
        this.error.set('Erreur lors du chargement des personnage');
        this.loading.set(false);
      }
    });
  }

  filterStatus(value: string) {
    this.selectedFilter = value;
  }

  rechercher() {
    this.charger();
  }

  reinitialiser() {
    this.recherche = "";
    this.charger();
  }

  nextPage() {
    this.pageCourante.update(p => p + 1);
    this.charger(); 
  }

  prevPage() {
    this.pageCourante.update(p => p - 1);
    this.charger();
  }
}
