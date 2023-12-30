import { TestBed } from '@angular/core/testing';

import { MenteeServicesService } from './mentee-services.service';

describe('MenteeServicesService', () => {
  let service: MenteeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenteeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
