import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  imports: [CommonModule],
  styleUrls: ['./Navbar.component.css'],
  standalone: true
})

export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.sessionStorageService.isLoggedIn();
  }

  LogOut(): void {
    this.sessionStorageService.clear();
    this.isLoggedIn = false;
  }
}