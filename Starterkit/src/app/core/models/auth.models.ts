import {BaseCredential} from "@shared/auth/model/base-cridential.model";
import {AuditableModel} from "@shared/auth/model/auditable.model";
import {AccountType, Gender, IRole, IUserPrimary, UserLevel, UserStatus} from "@shared/auth/model/user/user.model";

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

  id?: string;
  avatarFileId?: string;
  avatarUrl?: string;
  background?: string;
  fullName?: string;
  username?: string;
  roles?: IRole[];
  emails?: string;
  emailVerified?: boolean;
  phoneNumbers?: string;
  title?: string;
  organizationId?: string;
  dayOfBirth?: Date;
  address?: string;
  description?: string;
  status?: string;
}

export class User implements  IUser{
  password: string;
  token?: string;

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

  id?: string;
  avatarFileId?: string;
  avatarUrl?: string;
  background?: string;
  fullName?: string;
  username?: string;
  roles?: IRole[];
  emails?: string;
  emailVerified?: boolean;
  phoneNumbers?: string;
  title?: string;
  organizationId?: string;
  dayOfBirth?: Date;
  address?: string;
  description?: string;
  status?: UserStatus;
}
