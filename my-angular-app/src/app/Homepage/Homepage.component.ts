import { Component } from '@angular/core';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { OnInit } from '@angular/core';
import { SessionStorageService } from '../storage.service';

@Component({
  selector: 'app-homepage', 
  templateUrl: './Homepage.component.html',
  styleUrls: ['./Homepage.component.css'],
  imports: [NavbarComponent]
})
export class HomepageComponent implements OnInit {
    isLoggedIn = true; 
    constructor(private sessionStorageService: SessionStorageService){}
    ngOnInit(): void {
      this.sessionStorageService.setItem('loggedIn', true);
    }
    
}
