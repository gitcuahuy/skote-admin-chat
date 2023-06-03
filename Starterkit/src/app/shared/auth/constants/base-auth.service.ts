import {BehaviorSubject, Observable} from "rxjs";
import { BaseCredential } from "../model/base-cridential.model";
import {AuthedResponse} from "@shared/auth/model/authedResponse";
import {LOCAL_STORAGE_KEYS} from "@shared/auth/constants/storage.constants";

export interface IAuthService<T extends BaseCredential> {
  get user$(): Observable<T | undefined>;

  set user(user: T | undefined);

  get token(): string | undefined;

  get refreshToken(): string | undefined;

  updateToken(token: string, refreshToken: string): void;

  loginUserName(data: {username: string, password: string, isRememberMe: boolean}): Observable<AuthedResponse>;

  loginOauth(code: string, PARTNER_ID: string): Observable<AuthedResponse>;

  logout(): Observable<void>;

  initForgotPassword(identifyId: string): Observable<any>;

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<boolean>;

  resetPassword(token: string, password: string): Observable<boolean>;

  initRefreshToken(): Observable<AuthedResponse>;

  check(): Observable<boolean>;

  profile(): Observable<T>;

  hasAnyAuthority(authorities: string[] | string): boolean;
}

export abstract class BaseAuthService<T extends BaseCredential> {

  protected _user: BehaviorSubject<T | undefined>;

  protected constructor() {

    this._user = new BehaviorSubject<T | undefined>(this.getItem(LOCAL_STORAGE_KEYS.PROFILE));
  }

  protected getItem<K>(key: string): K | undefined {
    const userStr = localStorage.getItem(key);
    return !!userStr ? JSON.parse(userStr) : undefined
  }

  protected setItem<K>(key: string, value: K | undefined): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  protected clearItem(key: string): void {
    localStorage.removeItem(key);
  }

  get user$(): Observable<T | undefined> {
    return this._user.asObservable();
  }

  set user(user: any | undefined) {
    this._user.next(user);
    if (user) {
      // this.localStorageService.store(LOCAL_STORAGE_KEYS.PROFILE, user);
      this.setItem(LOCAL_STORAGE_KEYS.PROFILE, user);
    } else {
      this.clearItem(LOCAL_STORAGE_KEYS.PROFILE)
      // this.localStorageService.clear(LOCAL_STORAGE_KEYS.PROFILE);
    }
  }

  get refreshToken(): string | undefined {
    // return this.localStorageService.retrieve(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    return this.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  }

  get token(): string | undefined {
    // return this.localStorageService.retrieve(LOCAL_STORAGE_KEYS.TOKEN);
    return this.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  updateToken(token?: string, refreshToken?: string): void {
    if (token) {
      // this.localStorageService.store(LOCAL_STORAGE_KEYS.TOKEN, token);
      this.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    } else {
      // this.localStorageService.clear(LOCAL_STORAGE_KEYS.TOKEN);
      this.clearItem(LOCAL_STORAGE_KEYS.TOKEN);
    }
    if (refreshToken) {
      // this.localStorageService.store(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      this.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    } else {
      // this.localStorageService.clear(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      this.clearItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    }
  };

}
