import {Component, OnInit} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserProfileService} from "@core/services/user.service";
import {User} from "@core/models/auth.models";

export const USER_FORM_FIELDS = {
  fullName: 'fullName',
  username: 'username',
  email: 'email',
  personal_email: 'personal_email', // email cá nhân
  phoneNumber: 'phoneNumber',
  dayOfBirth: 'dayOfBirth',
  avatarUrl: 'avatarUrl',
  address: 'address',
  description: 'description',
  status: 'status',
  roleId: 'roleId',
  departmentId: 'departmentId',
  gender: 'gender',
  identifyCardNumber: 'identifyCardNumber',
  provide: 'provide',
  supply_date: 'supply_date',
  shelter: 'shelter',
  placeOfResidence: 'placeOfResidence',
  taxCode: 'taxCode',
  education: 'education',
  school: 'school',
  major: 'major',
  graduationYear: 'graduationYear',
  maritalStatus: 'maritalStatus',
}

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  readonly breadCrumbItems = [{label: 'Quản lý nhân sự'}, {label: 'danh sách nhân sự', active: true}];
  readonly avatarPlaceholder = 'assets/images/users/Profile_avatar_placeholder_large.png';
  readonly USER_FORM_FIELDS = USER_FORM_FIELDS;
  avatar: NzUploadFile[] = [];
  domainData?: User;
  formHandler?: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserProfileService) {
  }

  ngOnInit(): void {
    this.initForm(this.domainData)
  }

  initForm(data?: User): void {
    this.formHandler = this.fb.group({
      [USER_FORM_FIELDS.fullName]: [data?.fullName],
      [USER_FORM_FIELDS.username]: [data?.username],
      [USER_FORM_FIELDS.email]: [data?.email],
      [USER_FORM_FIELDS.personal_email]: [data?.personal_email],
      [USER_FORM_FIELDS.phoneNumber]: [data?.phoneNumber],
      [USER_FORM_FIELDS.dayOfBirth]: [data?.dayOfBirth],
      [USER_FORM_FIELDS.address]: [data?.address],
      [USER_FORM_FIELDS.description]: [data?.description],
      [USER_FORM_FIELDS.status]: [data?.status],
      [USER_FORM_FIELDS.roleId]: [data?.role?.id],
      [USER_FORM_FIELDS.departmentId]: [data?.departmentId],
      [USER_FORM_FIELDS.gender]: [data?.gender],
      [USER_FORM_FIELDS.avatarUrl]: [data?.avatarUrl],
      [USER_FORM_FIELDS.identifyCardNumber]: [data?.identifyCardNumber],
      [USER_FORM_FIELDS.provide]: [data?.provide],
      [USER_FORM_FIELDS.supply_date]: [data?.supply_date],
      [USER_FORM_FIELDS.shelter]: [data?.shelter],
      [USER_FORM_FIELDS.placeOfResidence]: [data?.placeOfResidence],
      [USER_FORM_FIELDS.taxCode]: [data?.taxCode],
      [USER_FORM_FIELDS.education]: [data?.education],
      [USER_FORM_FIELDS.school]: [data?.school],
      [USER_FORM_FIELDS.major]: [data?.major],
      [USER_FORM_FIELDS.graduationYear]: [data?.graduationYear],
      [USER_FORM_FIELDS.maritalStatus]: [data?.maritalStatus],
    })
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
