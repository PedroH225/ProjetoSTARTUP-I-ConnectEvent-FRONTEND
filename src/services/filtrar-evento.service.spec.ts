import { TestBed } from '@angular/core/testing';

import { FiltrarEventoService } from './filtrar-evento.service';

describe('FiltrarEventoService', () => {
  let service: FiltrarEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrarEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
