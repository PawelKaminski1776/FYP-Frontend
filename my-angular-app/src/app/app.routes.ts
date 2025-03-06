import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Homepage/Homepage.component';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { WebscrapingpageComponent } from './Webscrapingpage/Webscrapingpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./Loginpage/Loginpage.component').then(m => m.LoginpageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./Homepage/Homepage.component').then(m => m.HomepageComponent)
  },
  {
    path: 'webscrape',
    loadComponent: () => import('./Webscrapingpage/Webscrapingpage.component').then(m => m.WebscrapingpageComponent)
  },
  {
    path: 'inspection-training',
    loadComponent: () => import('./Inspectiontrainingpage/Inspectiontrainingpage.component').then(m => m.InspectiontrainingpageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
