import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../services/location-service';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location-list',
  imports: [RouterLink],
  templateUrl: './location-list.html',
  styleUrl: './location-list.scss',
})
export class LocationListComponent {
  private service = inject(LocationService);

  locations = signal<Location[]>([])
  currentPage = signal(1);
  pageMax = signal(0);
  loading = signal(true);
  error = signal<string | null>(null)

  ngOnInit() { this.charger(); }

  charger() {
    this.loading.set(true);
    this.error.set(null)
    this.service.getAll(this.currentPage()).subscribe({
      next: data => {
        this.locations.set(data.results);
        this.pageMax.set(data.info.pages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des lieux');
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
