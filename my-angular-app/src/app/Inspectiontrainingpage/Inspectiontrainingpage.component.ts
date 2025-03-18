import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../storage.service';

@Component({
  selector: 'app-inspectiontrainingpage',
  templateUrl: './Inspectiontrainingpage.component.html',
  styleUrls: ['./Inspectiontrainingpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  providers: []
})
export class InspectiontrainingpageComponent implements OnInit {
  title = 'Inspectiontrainingpage';
  webScrapingForm: FormGroup;
  inspectionData: any = null;
  inspectionName: string = '';
  model: any; 
  models: any[] = []; 
  

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sessionStorageService: SessionStorageService) {
    this.webScrapingForm = this.fb.group({
      numOfImages: '',
      county: ''
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.inspectionName = params.get('inspectionName') || '';
      
      const savedModels = this.sessionStorageService.getItem('Models');
      if (savedModels) {
        try {
          this.models = JSON.parse(savedModels); 
          this.findModel();
        } catch (error) {
          console.error('Error parsing models from sessionStorage:', error);
        }
      } else {
        console.error('No models found in sessionStorage.');
      }
    });
  }
  

  findModel() {
    this.model = this.models.find(m => m.inspectionName.toLowerCase() === this.inspectionName.toLowerCase());
    
    if (this.model) {
      console.log('Model found:', this.model);
    } else {
      console.error('Model not found for inspection name:', this.inspectionName);
    }
  }

  onSubmit(): void {
    this.http.post<any>('https://localhost:5002', this.webScrapingForm.value)
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