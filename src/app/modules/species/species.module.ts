import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpecieListComponent } from './components/specie-list/specie-list.component';
import { SpecieFavoritesComponent } from './components/specie-favorites/specie-favorites.component';


@NgModule({
  declarations: [
    SpecieListComponent,
    SpecieFavoritesComponent
  ],
  imports: [
    CommonModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
