import { TestBed } from '@angular/core/testing';

import { MentorServicesService } from './mentor-services.service';

describe('MentorServicesService', () => {
  let service: MentorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
