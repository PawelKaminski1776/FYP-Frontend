import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'signup',
    loadComponent: () => import('./Signuppage/Signuppage.component').then(m => m.SignuppageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./Homepage/Homepage.component').then(m => m.HomepageComponent)
  },
  {
    path: 'addinspection',
    loadComponent: () => import('./Addinspectionpage/Addinspectionpage.component').then(m => m.AddInspectionpageComponent)
  },
  {
    path: 'Inspectionscraping/:inspectionName',
    loadComponent: () => import('./Inspectionscrapingpage/Inspectionscrapingpage.component').then(m => m.InspectionscrapingpageComponent)
  },
  {
    path: 'Inspectiontraining/:inspectionName',
    loadComponent: () => import('./Inspectiontrainingpage/Inspectiontrainingpage.component').then(m => m.InspectiontrainingpageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
