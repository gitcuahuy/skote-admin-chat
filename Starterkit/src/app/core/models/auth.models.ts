import {BaseCredential} from "@shared/auth/model/base-cridential.model";
import {AuditableModel} from "@shared/auth/model/auditable.model";
import {AccountType, Gender, IRole, IUserPrimary, UserLevel, UserStatus} from "@shared/auth/model/user/user.model";
import {AuthedResponse} from "@shared/auth/model/authedResponse";
import CommonUtils from "@shared/utils/CommonUtils";

export interface IUser extends BaseCredential, AuditableModel {
  gender?: Gender;
  roleIds?: string[];
  userLevel?: UserLevel;
  accountType?: AccountType;
  lastLoginAt?: string;
  lastAuthChangeAt?: string;
  userPrimary?: IUserPrimary;
  departmentName?: string;
  latitude?: number;
  longitude?: number;
  code?: string;
  id?: string;
  // avatarFileId?: string;
  avatarUrl?: string;
  background?: string;
  fullName?: string;
  username?: string;
  role?: IRole;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  title?: string;
  organizationId?: string;
  dayOfBirth?: Date;
  address?: string;
  description?: string;
  status?: string;

  search_fullName?: string;
  search_partials?: string[];
}

export class User implements  IUser{
  password?: string;

  gender?: Gender;
  roleIds?: string[];
  userLevel?: UserLevel;
  accountType?: AccountType;
  lastLoginAt?: string;
  lastAuthChangeAt?: string;
  userPrimary?: IUserPrimary;
  departmentName?: string;
  latitude?: number;
  longitude?: number;
  code?: string;
  id?: string;
  avatarFileId?: string;
  avatarUrl?: string;
  background?: string;
  fullName?: string;
  username?: string;
  role?: IRole;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  title?: string;
  organizationId?: string;
  dayOfBirth?: Date;
  address?: string;
  description?: string;
  status?: UserStatus;

  search_fullName?: string;
  search_partials?: string[];
  constructor(user?: IUser) {
    Object.assign(this, user);
  }
}
export interface ILoginResponse extends AuthedResponse, IUser {

}
