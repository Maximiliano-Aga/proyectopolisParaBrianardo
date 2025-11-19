import { TestBed } from '@angular/core/testing';

import { AsistenciasServiceService } from './asistencias-service.service';

describe('AsistenciasServiceService', () => {
  let service: AsistenciasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
