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
import { NavigationService } from '../navigation.service';

interface Annotation {
  bounding_box: number[];
  class_name: string;
  score: number;
  id?: string;
}

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
  inspectionData: any = null;
  ChangedInspectionData: any = null;
  inspectionName: string = '';
  model: any; 
  models: any[] = []; 
  apiError = '';

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
    private sessionStorageService: SessionStorageService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.inspectionName = params.get('inspectionName') || '';
        this.inspectionData = this.sessionStorageService.getItem('inspectionData');

        if (this.inspectionData) {
            this.inspectionData.forEach((item: any, index: number) => {
                console.log(`Item ${index + 1}:`, item);

                // Ensure each annotation has an ID
                if (item.annotations) {
                    Object.keys(item.annotations).forEach(category => {
                        item.annotations[category] = item.annotations[category].map((annotation: Annotation, annotationIndex: number) => ({
                            ...annotation,
                            id: annotation.id || `annotation-${category}-${index}-${annotationIndex}`
                        }));
                    });
                console.log(item.annotations);
                }
            });

            // Save back to sessionStorage
            this.sessionStorageService.setItem('inspectionData', this.inspectionData);
        }
    });
}



  updateAnnotations(): void {
    this.ChangedInspectionData = this.sessionStorageService.getItem('inspectionData');

    /*console.log("Updated inspection data:");
        for (let i = 0; i < this.ChangedInspectionData.length; i++) {
            console.log(`Item ${i + 1}:`, this.ChangedInspectionData[i]);

            if (this.ChangedInspectionData[i].annotations) {
                console.log(`Annotations for Item ${i + 1}:`);
                
                for (const category in this.ChangedInspectionData[i].annotations) {
                    if (this.ChangedInspectionData[i].annotations.hasOwnProperty(category)) {
                        for (let j = 0; j < this.ChangedInspectionData[i].annotations[category].length; j++) {
                            console.log(`    Annotation ${j + 1}:`, this.ChangedInspectionData[i].annotations[category][j]);
                        }
                    }
                }
            }
        }*/
  }

  

  onSubmit(event?: Event) {
    /* if (event) event.preventDefault(); 
    const requestData = {
      data: this.ChangedInspectionData,
      ModelUrl: this.sessionStorageService.getItem('ModelURL')
    };
    console.log(JSON.stringify(requestData));
    this.http
      .post<any>(`${environment.SendImagesAndAnnotationsApiUrl}/Api/SendAnnotationsAndImages/SendAnnotations`, requestData)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === "Success") {
            setTimeout(() => {
              console.log("Trigger ended");
              this.navigationService.navigateTo('/home');
            }, 100);
          } else {
            this.apiError = response.message;
          }
        },
        error: (error) => {
          this.apiError = error.error?.message || 'Error Sending Data';
          console.error('Error:', error);
        },
      });*/
  }
}
