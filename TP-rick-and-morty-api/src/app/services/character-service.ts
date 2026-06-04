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
    const params: string[] = [];
    if (page) params.push(`page=${page}`);
    if (name) params.push(`name=${encodeURIComponent(name)}`);
    if (status) params.push(`status=${encodeURIComponent(status)}`);

    const queryStr = params.length ? `?${params.join('&')}` : '';
    return this.http.get<CharacterResponse>(`${this.url}${queryStr}`);
  }

  getById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/${id}`);
  }

  getMany(ids: number[]): Observable<Character[]> {
    let joinedId = ids.join(',')
    return this.http.get<Character[]>(`${this.url}/${joinedId}`);
  }
}
