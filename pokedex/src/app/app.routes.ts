import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list';
import { PokemonDetail } from './pages/pokemon-detail/pokemon-detail';
import { FavorisComponent } from './pages/favoris/favoris';

export const routes: Routes = [
    { path: '', component: PokemonListComponent },
    { path: 'pokemon/:name', component: PokemonDetail },
    { path: 'favoris', component: FavorisComponent },
    { path: '**', redirectTo: '' },
];
