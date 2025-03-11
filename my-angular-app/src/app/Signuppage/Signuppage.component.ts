import { NgModule, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { NavigationService } from '../navigation.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-signuppage',
  templateUrl: './Signuppage.component.html',
  styleUrls: ['./Signuppage.component.css'],
  imports: [NavbarComponent, FormsModule, CommonModule, ReactiveFormsModule]
})
export class SignuppageComponent {
  createAccountForm: FormGroup;
  accountCreationError = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private navigationService: NavigationService) {
    this.createAccountForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.createAccountForm.invalid) {
      this.accountCreationError = 'Please fill in all fields correctly.';
      return;
    }

    this.http
      .post<any>(`${environment.UserDetailsapiUrl}/Api/UserDetails/AddNewAccount`, this.createAccountForm.value)
      .subscribe({
        next: (response) => {
          if(response.message == 'Request Successful')
         {
            this.navigationService.navigateTo('/login');
            // Add Text Prompt at Top later
          }
        },
        error: (error) => {
          this.accountCreationError = error.error?.message || 'Error creating account';
          console.error('Error:', error);
        },
      });
  }
}
