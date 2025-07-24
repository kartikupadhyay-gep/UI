import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { Home } from './app/api/home/home';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
