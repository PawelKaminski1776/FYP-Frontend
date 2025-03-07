import { Component } from '@angular/core';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { OnInit } from '@angular/core';
import { SessionStorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-homepage', 
  templateUrl: './Homepage.component.html',
  styleUrls: ['./Homepage.component.css'],
  imports: [NavbarComponent]
})
export class HomepageComponent implements OnInit {
    isLoggedIn = true; 
    constructor(private sessionStorageService: SessionStorageService, private navigationService: NavigationService){}
    ngOnInit(): void {
      this.sessionStorageService.setItem('loggedIn', true);
    }

    LogOut(): void {
      this.sessionStorageService.clear();
      this.isLoggedIn = false;
      setTimeout(() => {
        this.navigationService.navigateTo('/login');
      }, 100);
    }
    
}
