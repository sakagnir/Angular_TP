import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavorisService } from '../../services/favoris-service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-favoris',
  imports: [RouterLink],
  templateUrl: './favoris.html',
  styleUrl: './favoris.scss',
})
export class FavorisComponent {
  protected service = inject(FavorisService);

  savedFavoris = signal<Character[]>([]);

  ngOnInit() {
    this.savedFavoris.update(this.service.favoris);
  }
}
