import { bootstrapApplication } from '@angular/platform-browser';
import { LoginpageComponent } from './app/Loginpage/Loginpage.component'
import { appConfig } from './app/app.config';

bootstrapApplication(LoginpageComponent, appConfig).catch((err) => console.error(err));
