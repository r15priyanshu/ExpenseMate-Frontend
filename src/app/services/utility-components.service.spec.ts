import { TestBed } from '@angular/core/testing';

import { UtilityComponentsService } from './utility-components.service';

describe('UtilityComponentsService', () => {
  let service: UtilityComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
