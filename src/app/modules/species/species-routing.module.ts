import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableFavoritesComponent } from './components/observable-favorites/observable-favorites.component';
import { ObservableTableComponent } from './components/observable-table/observable-table.component';
import { SpecieFavoritesComponent } from './components/specie-favorites/specie-favorites.component';
import { SpecieListComponent } from './components/specie-list/specie-list.component';

const routes: Routes = [
  {
    path:'list',
    component: SpecieListComponent
  },
  {
    path:'favorites',
    component: SpecieFavoritesComponent
  },
  {
    path:'observable-table',
    component: ObservableTableComponent
  },
  {
    path:'observable-favorites',
    component: ObservableFavoritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule { }
