import { TestBed } from '@angular/core/testing';

import { LocalidadesServiceService } from './localidades-service.service';

describe('LocalidadesServiceService', () => {
  let service: LocalidadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalidadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
