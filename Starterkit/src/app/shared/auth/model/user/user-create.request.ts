import {IUser} from "@shared/auth/model/user/user.model";
import {RegisterUserRequest} from "@shared/auth/model/user/register-user.request";

export interface UserCreateRequest extends IUser {
  password: string;
}
