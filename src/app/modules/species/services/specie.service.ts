import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page';
import { Specie } from '../models/specie';
import { Observable, takeWhile, expand, of, BehaviorSubject } from 'rxjs';



const BASE_URL = 'https://swapi.dev/api/species/';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private speciesList: Specie[] = [];

  private speciesListFavorites: Specie[] = [];

  $speciesListSubject = new BehaviorSubject<Specie[]>([]);

  $speciesFavoriteListSubject = new BehaviorSubject<Specie[]>([]);

  constructor(private http: HttpClient) { }

  getPagitnated(pageNumber?: number): Observable<Page<Specie>> {
    const page = pageNumber ? `?page=${pageNumber}` : '';
    return this.http.get<Page<Specie>>(`${BASE_URL}${page}`);
  }

  getAll(): Observable<any> {
    return new Observable((subscriber) => {
      this.getPagitnated()
        .pipe(
          expand((res) => {
            return this.getPagitnated(+res.next.split('page=')[1]);
          }),
          takeWhile((x) => x.next != null, true)
        )
        .subscribe((response) => {
          this.speciesList.push(...response.results);
          if (response.next === null) {
            subscriber.next(this.speciesList);
            subscriber.complete();
          }
        });
    });
  }

  getAllFavorites(): Observable<Specie[]> {
    return of<Specie[]>(this.speciesListFavorites);
  }

  moveToFavorites(index: number): void {
    const favorite = this.speciesList.splice(index, 1)[0];
    this.$speciesListSubject.next(this.speciesList);
    if (favorite) {
      this.speciesListFavorites.push(favorite);
      this.$speciesFavoriteListSubject.next(this.speciesListFavorites);
      localStorage.setItem('speciesFavorites', JSON.stringify(this.speciesListFavorites));
      localStorage.setItem('species', JSON.stringify(this.speciesList));
    }
  }

  removeFromFavorites(index: number): void {
    const noFavorite = this.speciesListFavorites.splice(index, 1)[0];
    this.$speciesFavoriteListSubject.next(this.speciesListFavorites);
    if (noFavorite) {
      this.speciesList.push(noFavorite);
      this.$speciesListSubject.next(this.speciesList);
      localStorage.setItem('speciesFavorites', JSON.stringify(this.speciesListFavorites));
      localStorage.setItem('species', JSON.stringify(this.speciesList));
    }
  }

  init(): void {
    console.log('%cInicializando carga de informacion', 'color:blue');
    if (localStorage.getItem('species') == null) {
      this.getAll()
        .subscribe((speciesList) => {
          localStorage.setItem('species', JSON.stringify(speciesList));
          this.$speciesListSubject.next(speciesList);
        });
    } else {
      const data = localStorage.getItem('species') as string;
      const list: Specie[] = JSON.parse(data) as Specie[];
      this.speciesList = list;
      this.$speciesListSubject.next(list);
    }
    if (localStorage.getItem('speciesFavorites')) {
      const data = localStorage.getItem('speciesFavorites') as string;
      const list: Specie[] = JSON.parse(data) as Specie[];
      this.speciesListFavorites = list;
      this.$speciesFavoriteListSubject.next(this.speciesListFavorites);
    }
  }
}

