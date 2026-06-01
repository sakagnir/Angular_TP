import { TestBed } from '@angular/core/testing';

import { ProduitServiceTs } from './produit.service.js';

describe('ProduitServiceTs', () => {
  let service: ProduitServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
