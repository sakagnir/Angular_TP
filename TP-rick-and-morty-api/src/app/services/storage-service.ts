import { effect, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T | null {
    let data = localStorage.getItem(key);
    if (data) {
      let parsedData = JSON.parse(data);
      return parsedData;
    }
    return null;
  }

  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
