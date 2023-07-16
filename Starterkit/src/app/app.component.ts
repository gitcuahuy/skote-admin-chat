import { Component , OnInit} from '@angular/core';
import {RemoteConfigService} from "@shared/config/remote-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private remoteConfigService: RemoteConfigService) {
  }
  ngOnInit() {
    // this.remoteConfigService.getRemoteConfigFromFirebase();
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
