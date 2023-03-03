import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpecieListComponent } from './components/specie-list/specie-list.component';
import { SpecieFavoritesComponent } from './components/specie-favorites/specie-favorites.component';
import { ObservableTableComponent } from './components/observable-table/observable-table.component';
import { ObservableFavoritesComponent } from './components/observable-favorites/observable-favorites.component';


@NgModule({
  declarations: [
    SpecieListComponent,
    SpecieFavoritesComponent,
    ObservableTableComponent,
    ObservableFavoritesComponent
  ],
  imports: [
    CommonModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
