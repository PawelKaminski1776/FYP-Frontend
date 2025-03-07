import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../navigation.service';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { SessionStorageService } from '../storage.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './Loginpage.component.html',
  styleUrls: ['./Loginpage.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class LoginpageComponent {
  email = '';
  password = '';
  loginError = '';

  constructor( private navigationService: NavigationService, private sessionStorageService: SessionStorageService) {}
  onSubmit(event: Event): void {
    event.preventDefault();
    

    if (this.email === 'John@gmail.com' && this.password === 'password') {
      console.log("Trigger started");
      this.sessionStorageService.setItem('loggedIn', true);
      console.log(this.sessionStorageService.getItem('loggedIn'))
      setTimeout(() => {
        console.log("Trigger ended")
        this.navigationService.navigateTo('/home');
      }, 100);
    } else {
      this.loginError = 'Invalid email or password.';
    }
  }
}