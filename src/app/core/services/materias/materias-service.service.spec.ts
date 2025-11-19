import { TestBed } from '@angular/core/testing';

import { MateriasServiceService } from './materias-service.service';

describe('MateriasServiceService', () => {
  let service: MateriasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
