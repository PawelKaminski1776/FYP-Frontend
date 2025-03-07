import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private storageSubjects: Map<string, BehaviorSubject<any>> = new Map();

  constructor(private navigationService: NavigationService) {}

  // Set a value in sessionStorage and notify observers
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
    
    if (!this.storageSubjects.has(key)) {
      this.storageSubjects.set(key, new BehaviorSubject<any>(value));
    } else {
      this.storageSubjects.get(key)!.next(value);
    }
  }

  // Get a value from sessionStorage
  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Get a value as an observable
  getItemAsObservable(key: string): Observable<any> {
    if (!this.storageSubjects.has(key)) {
      const initialValue = this.getItem(key);
      this.storageSubjects.set(key, new BehaviorSubject<any>(initialValue));
    }
    return this.storageSubjects.get(key)!.asObservable();
  }

  // Remove an item from sessionStorage and notify observers
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
    if (this.storageSubjects.has(key)) {
      this.storageSubjects.get(key)!.next(null);
    }
  }

  // Clear all items from sessionStorage and notify all observers
  clear(): void {
    sessionStorage.clear();
    this.storageSubjects.forEach(subject => subject.next(null));
    setTimeout(() => {
      this.navigationService.navigateTo('/login');
    }, 100);
  }

  // Check if the user is logged in (as an observable)
  isLoggedIn(): Observable<boolean> {
    return this.getItemAsObservable('loggedIn');
  }
}
