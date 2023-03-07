import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page';
import { Specie } from '../models/specie';
import { Homeworld } from '../models/homeworld';
import { Observable, takeWhile, expand, of, BehaviorSubject, map, reduce, tap, EMPTY, mergeMap, concatMap, filter, from, toArray, concatAll, take } from 'rxjs';



const SPECIES_URL = 'https://swapi.dev/api/species/';
const BASE_URL = 'https://swapi.dev/api/';
const HINT = 'species';

/**
  takeUntil,
  concatMap
  mermeMap
  SwitchMap
  exhautMap

*/


@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private speciesList: Specie[] = [];

  private speciesListFavorites: Specie[] = [];

  $speciesListSubject = new BehaviorSubject<Specie[]>([]);

  $speciesFavoriteListSubject = new BehaviorSubject<Specie[]>([]);

  $speciesBehaviorSubject = new BehaviorSubject<Specie[]>([]);

  private $speciesListBehaviorSubject = new BehaviorSubject<[Specie[], number]>([[],0]);
  private list:Specie[] = [];


  constructor(private http: HttpClient) { }

  getSpeciesListObservable():Observable<[Specie[], number]>{
    return this.$speciesListBehaviorSubject.asObservable();
  }

  initSecondObservable():void{
    this.getSpecies2()
    .subscribe(data => {
      this.list.push(data[0]);
      this.$speciesListBehaviorSubject.next([this.list, data[1]]);
    });
  }

  getSpecies2(): Observable<[Specie, number]> {
    let total:number = 0;
    return this.http.get<Page<Specie>>(`${BASE_URL}${HINT}/`)
      .pipe(
        expand(pageSpecie => pageSpecie.next ? this.http.get<Page<Specie>>(pageSpecie.next) : EMPTY),
        tap(result => {
          total = result.count;
        }),
        // take(3), // remove only for test
        map(pageSpecie => pageSpecie.results),
        concatAll(),
        // take(4) // remove only for test
        mergeMap(specie => {
          if (specie.homeworld == null) {
            return of(specie);
          }
          return this.http.get<Homeworld>(specie.homeworld).pipe(
            map(resultHomeworld => {
              return {
                ...specie,
                homeworld: resultHomeworld.name
              };
            })
          );
        }),
        map(data => [data, total])
      )
  }

  getSpecies(): Observable<Array<Specie>> {
    return this.http.get<Page<Specie>>(`${BASE_URL}${HINT}/`)
      .pipe(
        expand(pageSpecie => pageSpecie.next ? this.http.get<Page<Specie>>(pageSpecie.next) : EMPTY),
        take(1), // remove only for test
        map(pageSpecie => pageSpecie.results),
        concatAll(),
        take(4) // remove only for test
      ).
      pipe(
        mergeMap(specie => {
          if (specie.homeworld == null) {
            return of(specie);
          }
          return this.http.get<Homeworld>(specie.homeworld).pipe(
            map(resultHomeworld => {
              return {
                ...specie,
                homeworld: resultHomeworld.name
              };
            })
          );
        }),
        toArray()
      );
  }

  getSpeciesFavorites(): Observable<Specie[]> {
    if (!localStorage.getItem('favorites')) {
      return of(new Array<Specie>());
    } else {
      const data = localStorage.getItem('favorites') as string;
      const list = JSON.parse(data) as Specie[];
      return of(list);
    }
  }

  initObservableMode(): void {
    const data = localStorage.getItem('favorites') as string;
    if (!data) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
    this.getSpecies()
      .subscribe(speciesList => {
        this.$speciesBehaviorSubject.next(speciesList)
      });
  }

  getPagitnated(pageNumber?: number): Observable<Page<Specie>> {
    const page = pageNumber ? `?page=${pageNumber}` : '';
    return this.http.get<Page<Specie>>(`${SPECIES_URL}${page}`);
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

