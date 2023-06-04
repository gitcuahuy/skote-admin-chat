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

  registerUser(loginRequest: RegisterUserRequest): Observable<firebase.auth.UserCredential> {
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(loginRequest.username, loginRequest.password))
      .pipe(
        catchError((error) => {
          console.log('error', error);
          return throwError(error.message);
        })
      );
  }

  /**
   * Login user with given details
   */
  loginUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
  }

  oauthLogin = (provider: firebase.auth.AuthProvider): Observable<firebase.auth.UserCredential> => {
    return  fromPromise(firebase.auth().signInWithPopup(provider))
  }
  /**
   * forget Password user with given details
   */
  forgetPassword = (email: string) => {
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
