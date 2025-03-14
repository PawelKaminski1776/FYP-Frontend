import { NgModule, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../Navbar/Navbar.component';

@Component({
  selector: 'app-inspectionpage',
  templateUrl: './Inspectionpage.component.html',
  styleUrls: ['./Inspectionpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  providers: []
})
export class InspectionpageComponent {
  webScrapingForm: FormGroup;
  inspectionData: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.webScrapingForm = this.fb.group({
      numOfImages: '',
      county: '',
      inspectionName: ''
    });
  }

  onSubmit(): void {
    this.http.post<any>('https://localhost:5002/Api/Training/Websrape', this.webScrapingForm.value)
      .subscribe({
        next: (response) => {
          this.inspectionData = response;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
