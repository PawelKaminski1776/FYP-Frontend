import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../Navbar/Navbar.component';

@Component({
  selector: 'app-inspectiontrainingpage',
  templateUrl: './Inspectiontrainingpage.component.html',
  styleUrls: ['./Inspectiontrainingpage.component.css'],
  standalone: true,
  imports: [FormsModule, NavbarComponent]
})
export class InspectiontrainingpageComponent {
  title = 'Inspectiontrainingpage';

}