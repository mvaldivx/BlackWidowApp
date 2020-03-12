import { TestBed } from '@angular/core/testing';

import { TallasService } from './tallas.service';

describe('TallasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TallasService = TestBed.get(TallasService);
    expect(service).toBeTruthy();
  });
});
