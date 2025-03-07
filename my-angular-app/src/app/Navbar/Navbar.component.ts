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
    this.sessionStorageService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status; // Update the value when it changes
    });
  }
  

  ngOnChange(): void {
    this.isLoggedIn = this.sessionStorageService.getItem('loggedIn');
    console.log(this.sessionStorageService.getItem('loggedIn'))
  }

  LogOut(): void {
    this.sessionStorageService.clear();
    this.isLoggedIn = false;
  }
}