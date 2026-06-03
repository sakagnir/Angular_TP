import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { environment } from '../environments/environment';
import { CharacterResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/character`;

  getAll(page: number, name?: string, status?: string): Observable<CharacterResponse> {
    let query;
    if (page) {
      query = this.http.get<CharacterResponse>(`${this.url}?page=${page}`);
    } else {
      query = this.http.get<CharacterResponse>(`${this.url}`);

    }
    return query;
  }

  getById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/${id}`);
  }

  getMaby(ids: number[]): Observable<Character[]> {
    let joinedId = ids.join(',')
    return this.http.get<Character[]>(`${this.url}/${joinedId}`);
  }
}
