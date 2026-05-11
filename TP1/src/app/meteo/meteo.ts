import { Component } from '@angular/core';

@Component({
  selector: 'app-meteo',
  imports: [],
  templateUrl: './meteo.html',
  styleUrl: './meteo.scss',
})
export class Meteo {
  city = "Paris";
  temp = 18;
  condition = "Ensoleillé";
  humidity = 45;
  wind = 12;
}
