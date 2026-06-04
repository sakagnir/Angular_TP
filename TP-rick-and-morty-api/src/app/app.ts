import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FavorisService } from './services/favoris-service';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TP-rick-and-morty-api');
  private favoris = inject(FavorisService);
  savedFavoris = signal<Character[]>([]);

  ngOnInit() {
    this.savedFavoris.update(this.favoris.favoris);
  }
}
