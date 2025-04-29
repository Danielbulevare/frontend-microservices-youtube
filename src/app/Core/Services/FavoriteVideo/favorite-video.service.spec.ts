import { TestBed } from '@angular/core/testing';

import { FavoriteVideoService } from './favorite-video.service';

describe('FavoriteVideoService', () => {
  let service: FavoriteVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
