import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../storage.service';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspectionscrapingpage',
  templateUrl: './Inspectionscrapingpage.component.html',
  styleUrls: ['./Inspectionscrapingpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FormsModule],
  standalone: true,
  providers: []
})
export class InspectionscrapingpageComponent implements OnInit {
  title = 'Inspectiontrainingpage';
  GetImagesForm: FormGroup;
  inspectionData: any = null;
  inspectionName: string = '';
  model: any; 
  models: any[] = []; 
  load = false;
  synchResponse = '';
  selectedMode: string = 'automatic';
  textfields: string[] = ['']; 

  annotations = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    this.GetImagesForm = this.fb.group({
      numOfImages: '',
      county: '',
      website: '',
      inspection: '',
      model_dir: ''
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.inspectionName = params.get('inspectionName') || '';
      this.loadModelsFromSessionStorage();
    });
  }

  loadModelsFromSessionStorage(): void {
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
  }

  findModel(): void {
    this.model = this.models.find(m => m.inspectionName.toLowerCase() === this.inspectionName.toLowerCase());
    this.sessionStorageService.setItem('ModelURL', this.model.modelURL);
    if (this.model) {
      console.log('Model found:', this.model);
    } else {
      console.error('Model not found for inspection name:', this.inspectionName);
    }
    this.initForm();
  }

  initForm(): void {
    this.GetImagesForm = this.fb.group({
      numOfImages: '',
      county: '',
      website: '',
      inspection: this.inspectionName,
      model_dir: this.model ? this.model.modelURL : ''
    });
  }

  onSynch(): void {
    const params = { ModelURL: this.model?.modelURL ?? '' };
  
    this.http.get<any>(
      `${environment.SynchModelsToS3Url}/Api/SynchModels/Synch`,
      { params }
    ).subscribe({
      next: (response) => {
        this.synchResponse = "Synch with S3 Successful";
      },
      error: (error) => {
        console.error('Error:', error);
        this.load = false;
      }
    });
  }

  checkTrainingMode() {
    if (this.selectedMode === 'automatic') {
      console.log('Automatic training selected');
    } else if (this.selectedMode === 'semi') {
      console.log('Semi-automatic training selected');
    }
  }
  
  onSubmit(): void {
    this.load = true;
  
    const formValues = this.GetImagesForm.value;
    
    this.sessionStorageService.setItem('NumberOfImgs', formValues.numOfImages)
    this.sessionStorageService.setItem('county',  formValues.county)
    this.sessionStorageService.setItem('inspection', this.inspectionName);

    if (this.selectedMode === 'automatic') {
      console.log('Automatic training selected');

      
      const params = {
        ModelUrl: this.model?.modelURL ?? '',
        NumberOfImgs: formValues.numOfImages,
        county: formValues.county,
        inspection: this.inspectionName
      };
  
      this.http.get<any>(
        `${environment.StartAutomaticTraining}/Api/AutomaticTraining/StartAutomaticTraining`,
        { params }
      ).subscribe({
        next: (response) => {
          this.load = false;
          this.sessionStorageService.setItem('showAlert', true);
          this.sessionStorageService.setItem('alertmessage', 'Training Started Successfully');
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.load = false;
        }
      });
  
    } else if (this.selectedMode === 'semi') {
      console.log('Semi-automatic training selected');
  
      this.http.post<any>(
        `${environment.GetImagesAndAnnotationsApiUrl}/Api/GetImagesAndAnnotations/GetAnnotations`,
        formValues
      ).subscribe({
        next: (response) => {
          this.sessionStorageService.setItem('inspectionData', response.data);
          this.router.navigate([`Inspectiontraining/${this.inspectionName}`]);
        },
        error: (error) => {
          console.error('Error:', error);
          this.load = false;
        }
      });
    }
  }
  
}
