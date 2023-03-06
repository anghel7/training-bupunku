import { Component } from '@angular/core';
import { SpecieService } from './modules/species/services/specie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicios';

  constructor(private specieService:SpecieService){
    // this.specieService.init();
    // this.specieService.initObservableMode();
  }
}
