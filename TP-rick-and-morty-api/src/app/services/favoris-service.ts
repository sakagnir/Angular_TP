import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterService } from './character-service';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class FavorisService {
  private _favoris = signal<Character[]>([]);
  private service = inject(CharacterService);
  private storage = inject(StorageService);

  favoris = this._favoris.asReadonly()
  nombre = computed(() => this._favoris().length);

  isFavori(id: number): boolean {
    return this._favoris().some( c => c.id === id);
  }

  toggle(c: Character): void {
    this._favoris.update(list => list.includes(c) ? list.filter(n => n !== c) : [...list, c])
  }
}
