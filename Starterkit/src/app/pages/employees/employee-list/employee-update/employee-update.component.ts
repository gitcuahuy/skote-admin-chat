import {Component, OnInit} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  readonly breadCrumbItems = [{label: 'Quản lý nhân sự'}, {label: 'danh sách nhân sự', active: true}];
  readonly avatarPlaceholder = 'assets/images/users/Profile_avatar_placeholder_large.png';
  avatar: NzUploadFile[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

//   UTILS
  getAvatarUrl(): string {
    console.log(this.avatar)
    if (this.avatar.length > 0) {
      return this.avatar[0].thumbUrl;
    }
    return this.avatarPlaceholder;
  }
}
