import { NgModule, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routes';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './Loginpage.component.html',
  styleUrls: ['./Loginpage.component.css'],
  standalone: true,
  imports: [AppRoutingModule, CommonModule, FormsModule],
})
export class LoginpageComponent {
  title = 'Loginpage';
  email = '';
  password = '';
  loginError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService 
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.email === 'John@gmail.com' && this.password === 'password') {
      console.log('Login successful');
      this.navigationService.navigateTo('/home'); 
    } else {
      console.error('Login failed');
      this.loginError = 'Invalid email or password.';
    }
  }
}