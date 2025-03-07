import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Navbar/Navbar.component';
import { WebscrapingpageComponent } from './Webscrapingpage/Webscrapingpage.component';
import { SignuppageComponent } from './Signuppage/Signuppage.component';
import { AppRoutingModule } from './app.routes';
import { FooterComponent } from './Footer/Footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AppRoutingModule, FooterComponent,CommonModule, NavbarComponent, SignuppageComponent,WebscrapingpageComponent,  FormsModule, LoginpageComponent, InspectiontrainingpageComponent, HomepageComponent]
})

export class AppComponent {
  title = 'AppComponent'
}

