import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/location`

  getAll(page: number): Observable<Location[]>{
    return this.http.get<Location[]>(this.url);
  }

  getById(id: number): Observable<Location>{
    return this.http.get<Location>(`${this.url}/${id}`)
  }
}
