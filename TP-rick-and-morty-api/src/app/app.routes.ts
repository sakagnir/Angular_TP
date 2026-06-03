import { Routes } from '@angular/router';
import { CharactersDetailComponent, CharactersListComponent, ContactComponent, DashboardComponent, EpisodeDetailComponent, EpisodeListComponent, FavorisComponent, LocationDetailComponent, LocationListComponent, NotFoundComponent } from './pages/index';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'characters', component: CharactersListComponent },
    { path: 'characters/:id', component: CharactersDetailComponent },
    { path: 'locations', component: LocationListComponent},
    { path: 'locations/:id', component: LocationDetailComponent},
    { path: 'episodes', component: EpisodeListComponent},
    { path: 'episodes/:id', component: EpisodeDetailComponent},
    { path: 'favoris', component: FavorisComponent},
    { path: 'contact', component: ContactComponent},
    { path: '**', component: NotFoundComponent },
];
