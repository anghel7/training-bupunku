import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specie } from '../../models/specie';
import { SpecieService } from '../../services/specie.service';

@Component({
  selector: 'app-specie-list',
  templateUrl: './specie-list.component.html',
  styleUrls: ['./specie-list.component.css']
})
export class SpecieListComponent implements OnInit{

  specieslist:Specie[] = [];

  constructor(
    private specieService: SpecieService,
    private router: Router){

  }

  ngOnInit(): void {
    this.specieService.$speciesListSubject
    .subscribe((data)=>{
      this.specieslist = data;
    });
  }

  agregarFavoritos(specie: Specie, index: number): void {
    this.specieService.moveToFavorites(index);
    this.router.navigate(['/species/favorites'],);
  }

}
