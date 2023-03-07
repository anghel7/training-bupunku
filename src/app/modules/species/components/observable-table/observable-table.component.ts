import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { Specie } from '../../models/specie';
import { SpecieService } from '../../services/specie.service';

@Component({
  selector: 'app-observable-table',
  templateUrl: './observable-table.component.html',
  styleUrls: ['./observable-table.component.css']
})
export class ObservableTableComponent implements OnInit {
 
  constructor(private specieService: SpecieService,
    private router: Router) {

  }

  speciesDataSource$ = of(new Array<Specie>).pipe(
    map(specieList => {
      const data = localStorage.getItem('favorites') as string;
      const listFavorite = JSON.parse(data) as Specie[];
      if (listFavorite.length === 0) {
        return specieList;
      }
      const filteredArray = specieList.filter(specie => {
        return listFavorite.some(favorite => {
          return specie.name !== favorite.name;
        });
      });
      return filteredArray;
    })
  );

  secondDataSource$ = this.specieService.getSpeciesListObservable();

  ngOnInit(): void { }

  addFavortes(specie: Specie, specieList: Specie[], index: number): void {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
    const data = localStorage.getItem('favorites') as string;
    const list: Specie[] = JSON.parse(data) as Specie[];
    list.push(specie);
    localStorage.setItem('favorites', JSON.stringify(list));
    let favorite = specieList.splice(index, 1);
    this.router.navigate(['/species/observable-favorites'],);
  }

}
