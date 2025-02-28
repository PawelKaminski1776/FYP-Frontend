import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationTrigger = new Subject<string>();
  navigation$ = this.navigationTrigger.asObservable();

  constructor(private router: Router) {
    this.navigation$.subscribe(async (route) => {
      await this.router.navigate([route]);
      window.location.reload();
    });
  }

  navigateTo(route: string) {
    this.navigationTrigger.next(route);
  }
}