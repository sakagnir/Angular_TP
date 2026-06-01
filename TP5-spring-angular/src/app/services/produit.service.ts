import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitServiceTs {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/produits'

  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.url);
  }
}
