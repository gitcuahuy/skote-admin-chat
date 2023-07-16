import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '@core/services/auth.service';
import {environment} from '@environment/environment';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastrService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    if (environment.defaultauth === 'firebase') {
      this.authenticationService.initForgotPassword(this.f.email.value).pipe(catchError(
        (err) => {
          this.error = err ? err : '';
          this.toastService.error(this.error, 'Error');
          return throwError(err);
        }
      )).subscribe(
        () => {
          this.success = 'Reset password link sent to your email.';
          this.toastService.success(this.success, 'Success');
          this.router.navigate(['/account/login']);
        }
      );
    }
  }
}
