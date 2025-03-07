import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Homepage/Homepage.component'; 
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app.routes';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { InspectiontrainingpageComponent } from './Inspectiontrainingpage/Inspectiontrainingpage.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppRoutingModule,
    AppComponent,
    LoadingComponent,
    HomepageComponent,
    InspectiontrainingpageComponent,
    LoginpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent] 
})
export class AppModule { }
