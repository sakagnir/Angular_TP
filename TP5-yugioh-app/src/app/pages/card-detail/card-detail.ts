import { Component, inject, input, signal } from '@angular/core';
import { CardApiService } from '../../services/card-api';
import { RouterLink } from '@angular/router';
import { Card } from '../../models';

@Component({
  selector: 'app-card-detail',
  imports: [RouterLink],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss',
})
export class CardDetailComponent {
  private api = inject(CardApiService);
  id = input.required<string>();

  card = signal<Card | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.api.getCardById(Number(this.id())).subscribe({
      next: c => { this.card.set(c); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
