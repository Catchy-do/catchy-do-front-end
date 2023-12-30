import { TestBed } from '@angular/core/testing';

import { KHttpInterceptorService } from './k-http-interceptor.service';

describe('KHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KHttpInterceptorService = TestBed.get(KHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
