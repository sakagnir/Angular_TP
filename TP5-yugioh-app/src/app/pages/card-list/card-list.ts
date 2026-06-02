import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardApiService } from '../../services/card-api';
import { FilterService } from '../../services/filter';
import { CollectionService } from '../../services/collection';
import { Card } from '../../models';

@Component({
  selector: 'app-card-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardListComponent {
  private api = inject(CardApiService);
  protected filters = inject(FilterService);
  protected collection = inject(CollectionService);

  cards = signal<Card[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  recherche = '';

  ngOnInit() { this.charger(); }

  charger() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getCards(this.filters.filters(), 24, 0).subscribe({
      next: res => { this.cards.set(res.data); this.loading.set(false); },
      error: () => {
        this.error.set('Erreur de chargement des cartes.');
        this.loading.set(false);
      },
    });
  }

  rechercher() {
    this.filters.setRecherche(this.recherche);
    this.charger();
  }

  filterType(type: string) { this.filters.setType(type); this.charger(); }
  filterAttribute(attr: string) { this.filters.setAttribute(attr); this.charger() }
  reinitialiser() { this.filters.reset(); this.recherche = ''; this.charger(); }
}
