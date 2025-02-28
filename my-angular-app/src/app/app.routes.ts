import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Homepage/Homepage.component';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => LoginpageComponent
  },
  {
    path: 'home',
    loadComponent: () => HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
