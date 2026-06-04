import { Component, inject, input, signal } from '@angular/core';
import { LocationService } from '../../services/location-service';
import { Location } from '../../models/location.model';
import { CharacterService } from '../../services/character-service';
import { Character } from '../../models/character.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-location-detail',
  imports: [RouterLink],
  templateUrl: './location-detail.html',
  styleUrl: './location-detail.scss',
})
export class LocationDetailComponent {
  private service = inject(LocationService);
  private characterService = inject(CharacterService);

  location = signal<Location | null>(null);
  residents = signal<Character[]>([]);
  id = input.required<string>();
  ids: number[] = [];
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loading.set(true);
    this.service.getById(Number(this.id())).subscribe({
      next: l => {
        l.residents.forEach(r => {
          const id = r.split('/').pop();
          if (id) {
            this.ids.push(Number(id));
          }
        });
        this.location.set(l);
        this.characterService.getMany(this.ids).subscribe({
          next: characters => {
            this.residents.set(characters);
          }
        });
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement du lieu');
        this.loading.set(false);
      }
    });
  }
}
