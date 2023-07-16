import {Injectable} from '@angular/core';

import {getFirebaseBackend, RegisterUserRequest} from '../../authUtils';

import {ILoginResponse, IUser, User} from '../models/auth.models';
import {BaseAuthService, IAuthService} from "@shared/auth/constants/base-auth.service";
import {Observable, throwError} from "rxjs";
import {AuthedResponse} from "@shared/auth/model/authedResponse";
import {UserLevel} from "@shared/auth/model/user/user.model";
import {catchError, map, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {FIRE_COLLECTION} from "@shared/auth/constants/document.constants";
import CommonUtils from "@shared/utils/CommonUtils";
import firebase from "firebase";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({providedIn: 'root'})

export class AuthenticationService extends BaseAuthService<IUser> implements IAuthService<IUser> {

  // user: User;

  constructor() {
    super();
    console.log(this._user.value);
  }

  loginOauth(code: string, PARTNER_ID: string): Observable<AuthedResponse> {
    const authProvider = new GoogleAuthProvider();
    authProvider.setCustomParameters({
      prompt: "select_account"
    });
    return getFirebaseBackend().oauthLogin(authProvider).pipe(map(user => {
      return {
        accessToken: '',
        refreshToken: user.user.refreshToken,
        userId: user.user.uid,
        signInMethod: user.credential.signInMethod,
        providerId: user.credential.providerId,
      }
    }))
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

  loginUserName(data: { username: string; password: string; isRememberMe: boolean }): Observable<AuthedResponse> {
    return getFirebaseBackend().loginUser(data.username, data.password).pipe(
      switchMap(
        loginResponse => {
          return fromPromise(firebase.firestore().collection(FIRE_COLLECTION.users)
            .doc(loginResponse.user?.uid).get({source: 'default'})).pipe(
            map((user) => {
              if (!user.exists) {
                user.ref.set(CommonUtils.optimalObjectParams({
                  username: loginResponse.user?.email ?? "",
                  avatarUrl: loginResponse.user?.photoURL ?? "",
                  emailVerified: loginResponse.user?.emailVerified ?? false,
                  fullName: loginResponse.user?.displayName ?? "",
                  createdAt: new Date(),
                  deleted: false,
                }));
              }
              const userData = user.data();
              if (loginResponse.user.emailVerified && !userData?.emailVerified) {
                user.ref.update({emailVerified: true, lastLoginAt: new Date()});
              } else {
                user.ref.update({lastLoginAt: new Date()});
              }
              const userLoged: IUser = {
                username: userData?.username ?? "",
                email: userData?.email ?? "",
                avatarUrl: userData?.photoURL ?? "",
                fullName: userData?.fullName ?? "",
                deleted: userData?.deleted ?? false,
                createdAt: userData?.createdAt ?? new Date(),
                emailVerified: userData?.emailVerified || loginResponse.user.emailVerified,
                id: userData?.id ?? "",
                address: userData?.address ?? "",
                dayOfBirth: userData?.dayOfBirth ?? "",
                lastLoginAt: userData?.lastLoginAt ?? new Date(),
                departmentName: userData?.departmentName ?? "",
                background: userData?.background ?? "",
                description: userData?.description ?? "",
                latitude: userData?.latitude ?? "",
                longitude: userData?.longitude ?? "",
                gender: userData?.gender ?? "",
                roleIds: userData?.roleIds ?? [],
                accountType: userData?.accountType ?? "",
                title: userData?.title ?? "", // chức danh
                phoneNumbers: userData?.phoneNumbers ?? "",
                userLevel: userData?.userLevel ?? "",
                organizationId: userData?.organizationId ?? "",
                lastModifyAt: userData?.lastModifyAt ?? new Date(),
                lastModifyBy: userData?.lastModifyBy ?? "",
                createdBy: userData?.createdBy ?? "",
                lastAuthChangeAt: userData?.lastAuthChangeAt ?? new Date(),
              };
              console.log(userLoged)
              this.user = userLoged;
              const response: ILoginResponse = {
                refreshToken: loginResponse.user?.refreshToken ?? "",
                accessToken: "",
              }

              return response;
            })
          )
        }
      ));
  }

  sendVerifyEmail(): Observable<void> {
    return getFirebaseBackend().sendEmailVerification();
  }

  verifyAccount(code: string): Observable<void> {
    return getFirebaseBackend().verifyAccount(code);
  }

  /**
   * Performs the register
   * @param loginRequest RegisterUserRequest
   */
  register(loginRequest: RegisterUserRequest): Observable<IUser> {
    return getFirebaseBackend().registerUser(loginRequest).pipe(
      catchError(err => {
        return throwError(err);
      }),
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
        return fromPromise(firebase.firestore()
          .collection(FIRE_COLLECTION.users).doc(id)
          .set(CommonUtils.optimalObjectParams(user)))
          .pipe(map(() => {
            console.log('userCreated', user);
            return user;
          }));
      })
    );
  }

  /**
   * Reset password
   * @param token
   * @param password
   */
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

