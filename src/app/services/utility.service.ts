import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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

  public extractClaimFromToken(token: string, key: string): string | null {
    if (!token) return null;

    try {
      console.log(`Trying to extract claim : ${key}`)
      const decodedToken = jwtDecode<any>(token);
      return decodedToken[key] || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
