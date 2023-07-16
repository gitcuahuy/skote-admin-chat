import {Injectable} from '@angular/core';
import firebase from "firebase";
import {BehaviorSubject, Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import Value = firebase.remoteConfig.Value;

export interface IParams {
  [key: string]: Value
}

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  private configParam$: BehaviorSubject<IParams> = new BehaviorSubject({});
  fetchDone = false;

  constructor() {
    this.fetchParams();
  }

  getConfigParam$(): Observable<IParams> {
    return this.configParam$.asObservable();
  }

  fetchParams(): void {
    firebase.remoteConfig().defaultConfig = {
      authType: 'firebase'
    }
    fromPromise(firebase.remoteConfig().fetchAndActivate()).subscribe(() => {
      this.configParam$.next(firebase.remoteConfig().getAll())
      console.log('all configuration', this.configParam$.value)
      this.fetchDone = true;
    })
  }

  getRemoteConfigFromFirebase(): void {
    firebase.remoteConfig().fetchAndActivate().then(() => {
      console.log(firebase.remoteConfig().getAll(), 'remote config value');
      console.log(firebase.remoteConfig().getString('apiKey'), 'remote config value');
    })
    // this.remoteConfig.fetchAndActivate().then(() => {
    //
    // })
    // this.remoteConfig.changes.subscribe((value) => {
    //   console.log(value, 'remote config value')
    // })
  }
}
