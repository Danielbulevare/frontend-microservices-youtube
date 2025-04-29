import { TestBed } from '@angular/core/testing';

import { ApiYouTubeService } from './api-you-tube.service';

describe('ApiYouTubeService', () => {
  let service: ApiYouTubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiYouTubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
