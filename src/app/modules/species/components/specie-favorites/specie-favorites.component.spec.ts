import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieFavoritesComponent } from './specie-favorites.component';

describe('SpecieFavoritesComponent', () => {
  let component: SpecieFavoritesComponent;
  let fixture: ComponentFixture<SpecieFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
