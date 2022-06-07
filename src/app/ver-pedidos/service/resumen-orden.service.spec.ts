import { TestBed } from '@angular/core/testing';

import { ResumenOrdenService } from './resumen-orden.service';

describe('ResumenOrdenService', () => {
  let service: ResumenOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
