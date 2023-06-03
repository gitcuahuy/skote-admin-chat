import {BaseCredential} from "@shared/auth/model/base-cridential.model";
import {AuthedResponse} from "@shared/auth/model/authedResponse";
import {AuditableModel} from "@shared/auth/model/auditable.model";
import {IUser} from "@core/models/auth.models";

export interface IPermission {
  roleId?: string;
  resourceCode?: string;
  scope?: string
}
export interface IProperties {
  roleId?: string;
  property?: string;
}
export interface IRole {
  code?: string;
  description?: string;
  id?: string;
  isRoot?: boolean;
  name?: string;
  permissions?: IPermission[];
  roleLevel?: UserLevel;
  status?: string;
  properties?: IProperties[];
}
export enum RoleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUserPrimary {
  grantedPermissions: string[];
  isRoot?: boolean;
  accountType?: AccountType;
  userLevel?: UserLevel;
}

// export interface IProperty extends AuditableModel{
//   id?: string;
//   value: string;
//   label: string;
//   primary?: boolean;
// }


export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum UserLevel {
  CENTER = 'CENTER',
  BUILDING_MANAGER = 'BUILDING_MANAGER',
  TECHNICAL_LEADER = 'TECHNICAL_LEADER',
  SERVICE_LEADER = 'SERVICE_LEADER',
  EXPERT_LEADER = 'EXPERT_LEADER',
}
export enum AccountType {
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
}

