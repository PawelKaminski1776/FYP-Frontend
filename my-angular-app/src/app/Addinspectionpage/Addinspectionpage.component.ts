import { NgModule, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../Navbar/Navbar.component';

@Component({
  selector: 'app-addinspectionpage',
  templateUrl: './Addinspectionpage.component.html',
  styleUrls: ['./Addinspectionpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  providers: []
})
export class AddInspectionpageComponent {
  addinspectionForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const email = sessionStorage.getItem('Username');
    console.log("Email:" + email);
    this.addinspectionForm = this.fb.group({
      Cocofile: [null],
      Photos: [null],
      Inspectionname: ['', Validators.required],
      Email: [email || '', Validators.required]
    });
  }

  
  onSubmit(): void {
    const formData = new FormData();
    
    formData.append('Inspectionname', this.addinspectionForm.get('Inspectionname')?.value);
    formData.append('Email', this.addinspectionForm.get('Email')?.value || '');
    
    const cocofileInput = document.getElementById('formFile') as HTMLInputElement;
    const cocofile = cocofileInput?.files;
    console.log('Cocofile value:', cocofile); 
    if (cocofile && cocofile.length > 0) {
      formData.append('Cocofile', cocofile[0]);
      console.log('Cocofile:', cocofile[0]);
    } else {
      console.log('No Cocofile selected');
    }

    const photosInput = document.getElementById('formFileMultiple') as HTMLInputElement;
    const photos = photosInput?.files;
    console.log('Photos value:', photos); 
    if (photos && photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        formData.append('Photos', photos[i]);
        console.log('Photo:', photos[i]);
      }
    } else {
      console.log('No Photos selected');
    }
    
    console.log(formData);
  
    this.http.post<any>('https://localhost:5002/Api/Training/AddInspectionPattern', formData)
      .subscribe({
        next: (response) => {
          console.log('Upload Successful', response);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
  

  
  
}
