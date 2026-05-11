import { Component } from '@angular/core';

@Component({
  selector: 'app-citation',
  imports: [],
  templateUrl: './citation.html',
  styleUrl: './citation.scss',
})
export class Citation {
  citation = [
    ['la première citation'],
    ['la seconde citation'],
    ['la troisième citation']
  ];

  number = Math.floor(Math.random() * 3);

  citationRandom() {
    this.number = Math.floor(Math.random() * 3)
  }
}
