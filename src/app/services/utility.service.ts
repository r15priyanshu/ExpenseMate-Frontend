import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  public addItemInLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItemFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
}
