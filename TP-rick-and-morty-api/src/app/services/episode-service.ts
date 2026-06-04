import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/episode`;

  getAll(page: number): Observable<ApiResponse<Episode>>{
    return this.http.get<ApiResponse<Episode>>(this.url);
  }

  getById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.url}/${id}`);
  }

  getMany(ids: number[]): Observable<Episode[]>{
    let joinedId = ids.join(',');
    return this.http.get<Episode[]>(`${this.url}/${joinedId}`);
  }
}
