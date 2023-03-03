import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Specie } from '../../models/specie';
import { SpecieService } from '../../services/specie.service';

@Component({
  selector: 'app-observable-favorites',
  templateUrl: './observable-favorites.component.html',
  styleUrls: ['./observable-favorites.component.css']
})
export class ObservableFavoritesComponent {

  constructor(private specieService: SpecieService,
    private router: Router) { }

  data: Specie[] = new Array<Specie>();

  speciesFavoritesDataSource$ = this.specieService.getSpeciesFavorites();

  removeFavorite(specie: Specie, list: Specie[], index: number): void {
    list.splice(index,1);
    const data = localStorage.getItem('favorites') as string;
    const listFavorite = JSON.parse(data) as Specie[];
    listFavorite.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(listFavorite));
    this.router.navigate(['/species/observable-table']);
  }
}
