import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '@core/services/auth.service';
import {environment} from '@environment/environment';
import {first} from 'rxjs/operators';
import {UserProfileService} from '@core/services/user.service';
import Validation from "@shared/utils/validation";

const FORM_FIELDS = {
  // username: 'username',
  fullName: 'fullName',
  email: 'email',
  password: 'password',
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  readonly signupForm: FormGroup;
  readonly FORM_FIELDS = FORM_FIELDS;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserProfileService) {
    this.signupForm = this.formBuilder.group({
      [FORM_FIELDS.fullName]: ['', [Validation.notBlank]],
      [FORM_FIELDS.email]: ['', [Validators.required, Validators.email]],
      [FORM_FIELDS.password]: ['', Validation.notBlank],
    });
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.register({
          username: this.signupForm.get(FORM_FIELDS.email)?.value,
          password: this.signupForm.get(FORM_FIELDS.password)?.value,
          signUpType: 'email',
          fullName: this.signupForm.get(FORM_FIELDS.fullName)?.value,
        }).subscribe(() => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/account/auth/verification']);
          }
        }, error => {
          this.error = error ? error : '';
        })
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['account/auth/verification']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }
}
