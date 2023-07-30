import {Component, OnInit} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserProfileService} from "@core/services/user.service";

export const USER_FORM_FIELDS = {
  fullName: 'fullName',
  username: 'username',
  email: 'email',
  phoneNumber: 'phoneNumber',
  dayOfBirth: 'dayOfBirth',
  address: 'address',
  description: 'description',
  status: 'status',
  roleId: 'roleId',
  departmentId: 'departmentId',
}

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  readonly breadCrumbItems = [{label: 'Quản lý nhân sự'}, {label: 'danh sách nhân sự', active: true}];
  readonly avatarPlaceholder = 'assets/images/users/Profile_avatar_placeholder_large.png';
  avatar: NzUploadFile[] = [];
  formHandler?: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserProfileService) {
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.formHandler = this.fb.group({})
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
