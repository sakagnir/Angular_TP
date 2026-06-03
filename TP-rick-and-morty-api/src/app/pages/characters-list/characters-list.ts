import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavorisService } from '../../services/favoris-service';
import { CharacterService } from '../../services/character-service';
import { Character } from '../../models/character.model';
import { Info } from '../../models/info.model';

@Component({
  selector: 'app-characters-list',
  imports: [RouterLink],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersListComponent {
  protected favoris = inject(FavorisService);
  private characterService = inject(CharacterService);

  characters = signal<Character[]>([]);
  pageMax = 0;

  loading = signal(true);
  error = signal<string | null>(null);
  pageCourante = signal(1);
  recherche = '';

  ngOnInit() { this.charger(); }

  charger() {
    this.loading.set(true);
    this.error.set(null);

    this.characterService.getAll(this.pageCourante()).subscribe({
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

  nextPage() {
    this.pageCourante.update(p => p + 1);
    this.charger(); 
  }

  prevPage() {
    this.pageCourante.update(p => p - 1);
    this.charger();
  }
}
