import { Component } from '@angular/core';
import { Specie } from '../../models/specie';
import { SpecieService } from '../../services/specie.service';

@Component({
  selector: 'app-specie-favorites',
  templateUrl: './specie-favorites.component.html',
  styleUrls: ['./specie-favorites.component.css']
})
export class SpecieFavoritesComponent {

  speciesListFavorites: Specie[] = [];

  constructor(private specieService: SpecieService) {

  }

  ngOnInit(): void {
    this.specieService.$speciesFavoriteListSubject
      .subscribe((data) => {
        this.speciesListFavorites = data;
      });
  }

  removeFromFavorites(specie: Specie, index: number): void {
    this.specieService.removeFromFavorites(index);
  }

}
