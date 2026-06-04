import { effect, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error(`Erreur parsing localStorage[${key}]:`, error);
      localStorage.removeItem(key);
    }
    return null;
  }

  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
