import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonApi } from '../../services/pokemon-api';
import { FavorisService } from '../../services/favoris';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss',
})
export class PokemonDetail {
  private api = inject(PokemonApi);
  favoris = inject(FavorisService);

  name = input.required<string>();

  pokemon = toSignal(
    toObservable(this.name).pipe(
      switchMap(n => this.api.getByName(n))
    )
  );
}
