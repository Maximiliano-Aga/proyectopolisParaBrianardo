import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraListComponent } from './carrera-list.component';

describe('CarreraListComponent', () => {
  let component: CarreraListComponent;
  let fixture: ComponentFixture<CarreraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
