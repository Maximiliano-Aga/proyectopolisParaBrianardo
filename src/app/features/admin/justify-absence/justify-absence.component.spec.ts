import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustifyAbsenceComponent } from './justify-absence.component';

describe('JustifyAbsenceComponent', () => {
  let component: JustifyAbsenceComponent;
  let fixture: ComponentFixture<JustifyAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustifyAbsenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustifyAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
