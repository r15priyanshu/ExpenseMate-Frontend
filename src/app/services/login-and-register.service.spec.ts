import { TestBed } from '@angular/core/testing';

import { LoginAndRegisterService } from './login-and-register.service';

describe('LoginAndRegisterService', () => {
  let service: LoginAndRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAndRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
