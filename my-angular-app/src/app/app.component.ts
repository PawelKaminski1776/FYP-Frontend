import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';
import { HomepageComponent } from './Homepage/Homepage.component';
import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AppRoutingModule, FormsModule, LoginpageComponent, InspectiontrainingpageComponent, HomepageComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
