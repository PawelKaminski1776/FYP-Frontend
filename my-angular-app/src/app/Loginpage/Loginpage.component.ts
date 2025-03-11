import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from '../navigation.service';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { SessionStorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-loginpage',
  templateUrl: './Loginpage.component.html',
  styleUrls: ['./Loginpage.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent, ReactiveFormsModule],
})
export class LoginpageComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor( private navigationService: NavigationService, private sessionStorageService: SessionStorageService, private http: HttpClient, private fb: FormBuilder) 
  {
        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginError = 'Please fill in all fields correctly.';
      return;
    }
    this.http
      .post<any>(`${environment.CheckLoginapiUrl}/Api/Accounts/Login`, this.loginForm.value)
      .subscribe({
        next: (response) => {
          console.log(response.email);
          console.log(this.loginForm.value.email);
          if(response.email == this.loginForm.value.email){
            this.sessionStorageService.setItem('loggedIn', true);
            this.sessionStorageService.setItem('Username', this.loginForm.value.email);
            console.log(this.sessionStorageService.getItem('loggedIn'))
            setTimeout(() => {
              console.log("Trigger ended")
              this.navigationService.navigateTo('/home');
            }, 100);
          }
          else {
            this.loginError = response.message
          }
        },
        error: (error) => {
          this.loginError = error.error?.message || 'Error Logging in';
          console.error('Error:', error);
        },
      });
  }
}