import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Homepage/Homepage.component'; 
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app.routes';
import { LoginpageComponent } from './Loginpage/Loginpage.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppRoutingModule,
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    CommonModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent] 
})
export class AppModule { }
