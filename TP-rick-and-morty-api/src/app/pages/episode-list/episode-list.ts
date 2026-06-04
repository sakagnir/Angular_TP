import { Component, inject, signal } from '@angular/core';
import { EpisodeService } from '../../services/episode-service';
import { Episode } from '../../models/episode.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-episode-list',
  imports: [RouterLink],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.scss',
})
export class EpisodeListComponent {
  private service = inject(EpisodeService);

  currentPage = signal(1);
  episodes = signal<Episode[]>([])
  maxPage = 0;
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.loading.set(true);
    this.error.set(null);
    this.service.getAll(this.currentPage()).subscribe({
      next: data => {
        this.episodes.set(data.results);
        this.maxPage = data.info.pages;
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des épisodes');
        this.loading.set(false);
      }
    })
  }

  nextPage() {
    this.currentPage.update(p => p + 1);
    this.charger();
  }

  prevPage() {
    this.currentPage.update(p => p - 1);
    this.charger();
  }
}
