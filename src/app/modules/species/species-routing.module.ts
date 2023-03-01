import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule { }
