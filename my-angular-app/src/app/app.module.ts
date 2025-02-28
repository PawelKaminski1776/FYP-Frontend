import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Homepage/Homepage.component'; 
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app.routes';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppRoutingModule,
    AppComponent,
    LoadingComponent,
    HomepageComponent,
    InspectiontrainingpageComponent,
    LoginpageComponent,
    HttpClient
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
