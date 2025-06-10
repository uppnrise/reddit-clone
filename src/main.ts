import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  // Enable production mode if needed for older Angular compatibility
}

bootstrapApplication(AppComponent, {
  providers: [
    // Add providers here as needed
  ],
}).catch((err) => console.error(err));
