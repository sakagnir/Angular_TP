import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CharacterService } from '../../services/character-service';
import { LocationService } from '../../services/location-service';
import { EpisodeService } from '../../services/episode-service';
import { FavorisService } from '../../services/favoris-service';
import { Character } from '../../models/character.model';
import { Location } from '../../models/location.model';
import { Episode } from '../../models/episode.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private characterService = inject(CharacterService);
  private locationService = inject(LocationService);
  private episodeService = inject(EpisodeService);
  protected favoris = inject(FavorisService);

  totalCharacters = signal<number | null>(null);
  totalLocations = signal<number | null>(null);
  totalEpisodes = signal<number | null>(null);

  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.characterService.getAll(1).subscribe({
      next: data => {
        this.totalCharacters.set(data.info.count);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('erreur lors du chargement');
        this.loading.set(false);
      }
    });
    this.locationService.getAll(1).subscribe({
      next: data => {
        this.totalLocations.set(data.info.count);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('erreur lors du chargement');
        this.loading.set(false);
      }
    });
    this.episodeService.getAll(1).subscribe({
      next: data => {
        this.totalEpisodes.set(data.info.count);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('erreur lors du chargement');
        this.loading.set(false);
      }
    });
  }
}
