import { TestBed } from '@angular/core/testing';

import { Pessoaservice } from './pessoaservice';

describe('Pessoaservice', () => {
  let service: Pessoaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pessoaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
