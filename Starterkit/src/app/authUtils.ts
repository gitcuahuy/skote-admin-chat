import firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import {LOCAL_STORAGE_KEYS} from "@shared/auth/constants/storage.constants";
import {Observable, throwError} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, map, switchMap} from "rxjs/operators";
import {FIRE_COLLECTION} from "@shared/auth/constants/document.constants";
import {ILoginResponse, IUser} from '@core/models/auth.models';
import CommonUtils from "@shared/utils/CommonUtils";

export interface RegisterUserRequest {
  username: string;
  password: string;
  fullName: string;
  signUpType: string;
}

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          sessionStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE, JSON.stringify(user));
        } else {
          sessionStorage.removeItem(LOCAL_STORAGE_KEYS.PROFILE);
        }
      });
    }
  }

  /**
   * Registers the user with given details
   */
  // registerUser = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(email, password).then((user: any) => {
  //       var user: any = firebase.auth().currentUser;
  //       resolve(user);
  //     }, (error) => {
  //       reject(this._handleError(error));
  //     });
  //   });
  // }

  registerUser(loginRequest: RegisterUserRequest): Observable<firebase.auth.UserCredential> {
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(loginRequest.username, loginRequest.password))
      .pipe(
        catchError((error) => {
          return throwError(error.message);
        })
      );
  }

  /**
   * Login user with given details
   */
  loginUser(email: string, password: string): Observable<ILoginResponse> {
    return fromPromise(firebase.auth().signInWithEmailAndPassword(email, password)).pipe(
      switchMap(
        loginResponse => {
          return fromPromise(firebase.firestore().doc(loginResponse.user?.uid).get({source: 'default'})).pipe(
            map((user) => {
              if (!user.exists) {
                user.ref.set({
                  username: loginResponse.user?.email ?? "",
                  avatarUrl: loginResponse.user?.photoURL ?? "",
                  emailVerified: loginResponse.user?.emailVerified ?? false,
                  fullName: loginResponse.user?.displayName ?? "",
                  deleted: false,
                })
              }
              // const userData = user.data();
              const response: ILoginResponse = {
                refreshToken: loginResponse.user?.refreshToken ?? "",
                accessToken: "",

                // fullName: userData?.fullName,
                // avatarUrl: userData?.avatarUrl ?? loginResponse.user?.photoURL,
                // id: loginResponse.user?.uid,
                // description: userData?.description,
                // gender: userData?.gender,
                // username: userData?.username,
                // status: userData?.status,
                // dayOfBirth: userData?.dayOfBirth,
                // accountType: userData?.accountType,
                // departmentName: userData?.departmentName,
                // address: userData?.address,
                // userLevel: userData?.userLevel,
                // avatarFileId: userData?.avatarFileId,
                // lastLoginAt: userData?.lastLoginAt,
                // title: userData?.title,
                // emailVerified: userData?.emailVerified,
                // background: userData?.background,
                // userPrimary: userData?.userPrimary,
                // deleted: userData?.deleted,
              }
              user.ref.update({lastLoginAt: new Date()});
              // this.user = response;
              return response;
            })
          )
        }
      ));
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = (email: string) => {
    // return new Promise((resolve, reject) => {
    //   // tslint:disable-next-line: max-line-length
    //   firebase.auth().sendPasswordResetEmail(email, {url: window.location.protocol + '//' + window.location.host + '/login'}).then(() => {
    //     resolve(true);
    //   }).catch((error) => {
    //     reject(this._handleError(error));
    //   });
    // });
    return fromPromise(firebase.auth()
      .sendPasswordResetEmail(email,
        {url: window.location.protocol + '//' + window.location.host + '/login'})).pipe(map(() => {
      return true;
    }));
  };


  confirmResetPassword = (code: string, newPassword: string) => {
    return fromPromise(firebase.auth().confirmPasswordReset(code, newPassword));
  }
  /**
   * Logout the user
   */
  logout = () => {
    // return new Promise((resolve, reject) => {
    //   firebase.auth().signOut().then(() => {
    //     resolve(true);
    //   }).catch((error) => {
    //     reject(this._handleError(error));
    //   });
    // });
    // return fromPromise(this.afAuth.signOut()).pipe(tap(() => {
    //   this.user = undefined;
    //   this.updateToken();
    // }));
    return fromPromise(firebase.auth().signOut());
  }

  clearAuthData(): void {
    CommonUtils.clearItem(LOCAL_STORAGE_KEYS.PROFILE);
    CommonUtils.clearItem(LOCAL_STORAGE_KEYS.TOKEN);
    CommonUtils.clearItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  }

  setLoggeedInUser = (user) => {
    // sessionStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE, JSON.stringify(user));
    CommonUtils.setItem(LOCAL_STORAGE_KEYS.PROFILE, user);
  }

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    return CommonUtils.getItem(LOCAL_STORAGE_KEYS.PROFILE);
  }

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // tslint:disable-next-line: prefer-const
    const errorMessage = error.message;
    return errorMessage;
  }
}

// tslint:disable-next-line: variable-name
let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = (): FirebaseAuthBackend => {
  return _fireBaseBackend;
};

export {initFirebaseBackend, getFirebaseBackend};
