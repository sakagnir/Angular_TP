import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
})
export class Profil {
  prenom = 'Denis';
  nom = 'Urgel';
  metier = 'Developpeur Fullstack';
  photo = 'https://i.pravatar.cc/150?img=12';
  contacter() {
    alert(`Contacter ${this.prenom} ${this.nom}`)
  }
}
