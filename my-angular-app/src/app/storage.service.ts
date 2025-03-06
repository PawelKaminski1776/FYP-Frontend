import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  // Set a value in sessionStorage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from sessionStorage
  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove an item from sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all items from sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
  
  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getItem('loggedIn') === true;
  }
}
