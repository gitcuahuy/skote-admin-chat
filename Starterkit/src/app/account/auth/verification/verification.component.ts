import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "@core/services/auth.service";
import {sendMessageToWorker} from "@angular/compiler-cli/ngcc/src/execution/cluster/utils";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,) { }
  // set the currenr year
  year: number = new Date().getFullYear();
  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')

  }

  resendEmail(): void {
    this.authenticationService.sendVerifyEmail().subscribe(res => {
      console.log(res);
    });
  }

  protected readonly sendMessageToWorker = sendMessageToWorker;
}
