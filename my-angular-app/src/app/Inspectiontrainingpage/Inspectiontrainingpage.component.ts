import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inspectiontrainingpage',
  templateUrl: './Inspectiontrainingpage.component.html',
  styleUrls: ['./Inspectiontrainingpage.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class InspectiontrainingpageComponent {
  title = 'Inspectiontrainingpage';
  selectedFiles: FileList | null = null;
  email: string = '';
  uploadProgress: number = 0;
  uploadResponse: string = '';

  constructor() {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(event: Event): void {
    event.preventDefault(); 
  }
}