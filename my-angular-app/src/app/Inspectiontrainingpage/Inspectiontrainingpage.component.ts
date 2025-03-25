import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../storage.service';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { BoundingBoxComponent } from './bounding-box/bounding-box.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Define the annotation structure
interface Annotation {
  bounding_box: number[];
  class_name: string;
  score: number;
  id?: string;
}

// Define the annotations structure
interface Annotations {
  [category: string]: Annotation[];
}

@Component({
  selector: 'app-inspectiontrainingpage',
  templateUrl: './Inspectiontrainingpage.component.html',
  styleUrls: ['./Inspectiontrainingpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, BoundingBoxComponent],
  providers: []
})
export class InspectiontrainingpageComponent implements OnInit {
  title = 'Inspectiontrainingpage';
  GetImagesForm: FormGroup;
  inspectionData: any = null;
  inspectionName: string = '';
  model: any; 
  models: any[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 3;

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.inspectionData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.inspectionData.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  annotations = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
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
      this.inspectionData = this.sessionStorageService.getItem('inspectionData');
    });

    this.inspectionData.forEach((item: any, index: number) => {
      console.log(`Item ${index + 1}:`, item);
    });
  }

  updateAnnotations(updatedAnnotations: Annotations, data: any): void {
    console.log(updatedAnnotations);
  
    // Use imageUrl to identify the correct item
    const updatedItemIndex = this.inspectionData.findIndex((item: any) => item.image === data.imageUrl);
  
    if (updatedItemIndex !== -1) {
      // Update the annotations for the correct item
      this.inspectionData[updatedItemIndex] = {
        ...this.inspectionData[updatedItemIndex],
        annotations: updatedAnnotations
      };
  
      console.log("Updated Data:", JSON.stringify(this.inspectionData[updatedItemIndex]));
    }
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

  //onSubmit(event: Event) {
    //event.preventDefault();  // Prevents the page reload
    //console.log("Annotations After Submission: " + this.annotations);
  //}

  onSubmit(event?: Event) {
    if (event) event.preventDefault();  // Extra safety
    console.log("Button clicked!");
    this.inspectionData.forEach((item: any, index: number) => {
      console.log(`Item ${index + 1}:`, item);
    });
  }
}
