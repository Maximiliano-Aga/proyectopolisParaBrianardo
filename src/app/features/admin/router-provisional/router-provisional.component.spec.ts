import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterProvisionalComponent } from './router-provisional.component';

describe('RouterProvisionalComponent', () => {
  let component: RouterProvisionalComponent;
  let fixture: ComponentFixture<RouterProvisionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterProvisionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterProvisionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
