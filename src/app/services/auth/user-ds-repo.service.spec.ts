import { TestBed } from '@angular/core/testing';

import { UserDsRepoService } from './user-ds-repo.service';

describe('UserDsRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDsRepoService = TestBed.get(UserDsRepoService);
    expect(service).toBeTruthy();
  });
});
