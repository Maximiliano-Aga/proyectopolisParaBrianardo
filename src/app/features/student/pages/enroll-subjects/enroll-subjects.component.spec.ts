import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollSubjectsComponent } from './enroll-subjects.component';

describe('EnrollSubjectsComponent', () => {
  let component: EnrollSubjectsComponent;
  let fixture: ComponentFixture<EnrollSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
