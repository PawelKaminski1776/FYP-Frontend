import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./Navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  models: any[] = []; 
  selectedInspection: string = '';

  constructor(
    private sessionStorageService: SessionStorageService, 
    private navigationService: NavigationService, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.sessionStorageService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
        this.fetchModels();
      }
    });
  }

  fetchModels(): void {
    const username = this.sessionStorageService.getItem('Username'); 

    if (!username) {
      console.error("Username is missing in session storage.");
      return;
    }

    const params = new HttpParams().set("Username", username);

    this.http.get<{ models: any[] }>(`${environment.ReceiveModelDataApiUrl}/Api/ReceiveModelDetails/GetModels`, { params })
      .subscribe(
        response => {
          this.models = response.models;
          this.sessionStorageService.setItem('Models', JSON.stringify(this.models));
        },
        error => {
          console.error('Error fetching models:', error);
        }
      );
  }

  onSelectionChange(event: Event): void {
    this.selectedInspection = (event.target as HTMLSelectElement).value;
    console.log('Selected Inspection:', this.selectedInspection);
  }

  LogOut(): void {
    this.sessionStorageService.clear();
    this.isLoggedIn = false;
  }
}
