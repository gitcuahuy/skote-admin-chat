import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "@core/services/auth.service";
import {Router} from "@angular/router";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
  ) {
  }

  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')

  }

  resendEmail(): void {
    this.authenticationService.sendVerifyEmail().subscribe(res => {
      console.log(res);
      this.toLogin()
    }, error => {
      console.log(error);
    })
  }

  toLogin(): void {
    this.router.navigate(['account/auth/login']);
  }
}
