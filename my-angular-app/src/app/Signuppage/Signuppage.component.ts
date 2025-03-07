import { NgModule, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signuppage',
  templateUrl: './Signuppage.component.html',
  styleUrls: ['./Signuppage.component.css'],
  imports: [NavbarComponent, FormsModule, CommonModule, ReactiveFormsModule]
})
export class SignuppageComponent {
  createAccountForm: FormGroup;
  accountCreationError = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
      .post<any>('https://localhost:5002/Api/Accounts/AddNewAccount', this.createAccountForm.value)
      .subscribe({
        next: (response) => {
          this.accountCreationError = response.message || 'Account created successfully';
        },
        error: (error) => {
          this.accountCreationError = error.error?.message || 'Error creating account';
          console.error('Error:', error);
        },
      });
  }
}
