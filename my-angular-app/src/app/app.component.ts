import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectionscrapingpageComponent } from './Inspectionscrapingpage/Inspectionscrapingpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Navbar/Navbar.component';
import { SignuppageComponent } from './Signuppage/Signuppage.component';
import { AppRoutingModule } from './app.routes';
import { FooterComponent } from './Footer/Footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AppRoutingModule, FooterComponent,CommonModule, NavbarComponent, SignuppageComponent, FormsModule, LoginpageComponent, InspectiontrainingpageComponent, InspectionscrapingpageComponent, HomepageComponent]
})

export class AppComponent {
  title = 'AppComponent'
}

