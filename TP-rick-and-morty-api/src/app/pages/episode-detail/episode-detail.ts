import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EpisodeService } from '../../services/episode-service';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character-service';

@Component({
  selector: 'app-episode-detail',
  imports: [RouterLink],
  templateUrl: './episode-detail.html',
  styleUrl: './episode-detail.scss',
})
export class EpisodeDetailComponent {
  private service = inject(EpisodeService);
  private characterService = inject(CharacterService);

  id = input.required<string>();
  episode = signal<Episode | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  ids: number[] = [];
  characters = signal<Character[]>([]);

  ngOnInit() {
    this.service.getById(Number(this.id())).subscribe({
      next: data => {
        this.episode.set(data);
        data.characters.forEach(url => {
          let charId = url.split('/').pop();
          this.ids.push(Number(charId));
        });
        this.characterService.getMany(this.ids).subscribe({
          next: data => {
            this.characters.set(data);
          }
        })
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Erreur lors du chargement de l'épisode");
      }
    })
  }
}
