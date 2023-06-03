import {Injectable} from '@angular/core';

import {getFirebaseBackend, RegisterUserRequest} from '../../authUtils';

import {ILoginResponse, IUser, User} from '../models/auth.models';
import {BaseAuthService, IAuthService} from "@shared/auth/constants/base-auth.service";
import {Observable} from "rxjs";
import {AuthedResponse} from "@shared/auth/model/authedResponse";
import {UserLevel} from "@shared/auth/model/user/user.model";
import {map, switchMap} from "rxjs/operators";
import firebase from "firebase";
import {fromPromise} from "rxjs/internal-compatibility";
import {FIRE_COLLECTION} from "@shared/auth/constants/document.constants";

@Injectable({providedIn: 'root'})

export class AuthenticationService extends BaseAuthService<IUser> implements IAuthService<IUser> {

  // user: User;

  constructor() {
    super();
  }

  loginOauth(code: string, PARTNER_ID: string): Observable<AuthedResponse> {
    throw new Error('Method not implemented.');
  }

  initForgotPassword(identifyId: string): Observable<boolean> {
    return getFirebaseBackend().forgetPassword(identifyId)
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  initRefreshToken(): Observable<AuthedResponse> {
    throw new Error('Method not implemented.');
  }

  /**
   * @description check user is logged in
   */
  check(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  profile(): Observable<IUser> {
    throw new Error('Method not implemented.');
  }

  hasAnyAuthority(authorities: string | string[], userLevel?: UserLevel | UserLevel[]): boolean {
    if (!this._user.value) {
      return false;
    }
    const user = this._user.value;
    if (user?.userPrimary?.isRoot) {
      return true;
    }
    if (userLevel) {
      if (!Array.isArray(userLevel)) {
        userLevel = [userLevel];
      }
      if (user?.userPrimary?.userLevel
        && !userLevel.includes(user?.userPrimary?.userLevel)) {
        return false;
      }
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return authorities.some((authority: string) => user?.userPrimary?.grantedPermissions?.includes(authority));
  }

  /**
   * Returns the current user
   */
  public currentUser(): User {
    return getFirebaseBackend().getAuthenticatedUser();
  }

  /**
   * Performs the auth
   * @param data
   */
  // login(email: string, password: string): Observable<IUser> {
  //   return getFirebaseBackend().loginUser(email, password)
  // }

  loginUserName(data: { username: string; password: string; isRememberMe: boolean }): Observable<AuthedResponse> {
    return getFirebaseBackend().loginUser(data.username, data.password)
  }

  /**
   * Performs the register
   * @param loginRequest RegisterUserRequest
   */
  register(loginRequest: RegisterUserRequest): Observable<IUser> {
    return getFirebaseBackend().registerUser(loginRequest).pipe(
      switchMap((userCredential: firebase.auth.UserCredential) => {
        const id = userCredential.user?.uid;
        const user: IUser = {
          username: userCredential.user?.email ?? "",
          email: userCredential.user?.email ?? "",
          fullName: loginRequest.fullName,
          avatarUrl: userCredential.user?.photoURL ?? "",
          emailVerified: userCredential.user?.emailVerified ?? false,
          createdAt: new Date(),
          id: id,
          deleted: false,
        }
        return fromPromise(firebase.firestore().collection(FIRE_COLLECTION.users).doc(id).set(user)).map(() => {
          return user;
        })
      })
    );
  }

  /**
   * Reset password
   * @param token
   * @param password
   */
  // resetPassword(email: string) {
  //   return getFirebaseBackend().forgetPassword(email).then((response: any) => {
  //     const message = response.data;
  //     return message;
  //   });
  // }
  resetPassword(token: string, password: string): Observable<boolean> {
    return getFirebaseBackend().confirmResetPassword(token, password).pipe(map((response: any) => {
      return true
    }));
  }

  /**
   * Logout the user
   */
  logout(): Observable<void> {
    return getFirebaseBackend().logout();
  }
}

