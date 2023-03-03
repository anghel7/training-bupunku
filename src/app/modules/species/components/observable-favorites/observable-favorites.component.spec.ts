import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableFavoritesComponent } from './observable-favorites.component';

describe('ObservableFavoritesComponent', () => {
  let component: ObservableFavoritesComponent;
  let fixture: ComponentFixture<ObservableFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
