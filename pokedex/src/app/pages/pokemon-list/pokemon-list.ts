import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonApi } from '../../services/pokemon-api';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonListComponent {
  private api = inject(PokemonApi);

  pokemons = toSignal(this.api.getList(), { initialValue: [] });

  readonly pageSize = 18;

  totalPages = computed(
    () => Math.ceil(this.filtres().length / this.pageSize)
  )

  recherche = signal('');

  filtres = computed(() => {
    const q = this.recherche().toLowerCase().trim();
    return this.pokemons().filter(p => p.name.includes(q));
  });

  onSearch(event: Event) {
    this.recherche.set((event.target as HTMLInputElement).value);
  }


}
