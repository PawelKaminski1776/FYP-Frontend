import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { SessionStorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './Homepage.component.html',
  styleUrls: ['./Homepage.component.css'],
  imports: [NavbarComponent, CommonModule]
})
export class HomepageComponent implements OnInit {
  isLoggedIn = true; 
  showAlert = false;
  alertType = 'success';
  alertMessage = 'Operation completed successfully!';
  modeldetails : any[] = []; 
  imagetrainingdetails : any[] = []; 
  username = '';

  constructor(
    private sessionStorageService: SessionStorageService,
    private navigationService: NavigationService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.sessionStorageService.setItem('loggedIn', true);
    // Check if the alert message needs to be shown on init
    if (this.sessionStorageService.getItem('showAlert') === true) {
      this.alertMessage = this.sessionStorageService.getItem('alertmessage');
      this.showAlert = true;
    }
    
    this.username = this.sessionStorageService.getItem('Username');
    const params = {
      username:  this.username
    };

    this.modeldetails = JSON.parse(this.sessionStorageService.getItem('Models'));
    console.log(this.modeldetails);
    this.http.get<any>(
            `${environment.ShowInspectionDetailsApiUrl}/Api/ShowInspectionDetails/GetInspectionDetails`,
            { params }
          ).subscribe({
            next: (response) => {
              this.imagetrainingdetails = response.data
              this.imagetrainingdetails.forEach(detail => {
                if (detail.numOfImages && detail.overalllossrate != null) {
                  detail.lossPerImage = detail.overalllossrate / detail.numOfImages;
                } else {
                  detail.lossPerImage = 0;
                }
              });
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
  }

  closeAlert() {
    this.showAlert = false;
    this.sessionStorageService.setItem('showAlert', false);
  }


  LogOut(): void {
    this.sessionStorageService.clear();
    this.isLoggedIn = false;
    setTimeout(() => {
      this.navigationService.navigateTo('/login');
    }, 100);
  }
}
