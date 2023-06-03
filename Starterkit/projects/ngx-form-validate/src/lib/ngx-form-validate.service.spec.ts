import { TestBed } from '@angular/core/testing';

import { NgxFormValidateService } from './ngx-form-validate.service';

describe('NgxFormValidateService', () => {
  let service: NgxFormValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFormValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
