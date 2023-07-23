import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {IUser, User} from '../models/auth.models';
import {Observable} from "rxjs";
import {FIRE_COLLECTION} from "@shared/auth/constants/document.constants";
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {ISearchWithPaginationOptionally} from "@shared/models/base-request.model";
import {STRING_POOL} from "@shared/constants/stringpool.constants";
import firebase from "firebase";

@Injectable({providedIn: 'root'})
export class UserProfileService {
  constructor(private http: HttpClient,
  ) {
  }

  getAll() {
    return this.http.get<User[]>(`/api/login`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  detail(id: string): Observable<IUser> {
    return fromPromise(firebase.firestore().collection(FIRE_COLLECTION.users).doc(id).get()).pipe(map((doc) => {
      const data = doc.data({serverTimestamps: 'estimate'})
      console.log('data', data, 'from id', id);
      return data
    }))
  }

  search(request?: ISearchWithPaginationOptionally): Observable<IUser[]> {
    // create query search with pagination firestore
    // let query = this.firestore.collection(FIRE_COLLECTION.users).ref
    //   .orderBy('createdAt', 'desc')
    //   .limit(request?.pageSize || 10)
    //   .startAfter(request?.pageIndex || 0)
    // if (request?.keyword) {
    //   const keywords = request.keyword.toLowerCase().split(STRING_POOL.SPACE)
    //   query = query.where('fullName', 'array-contains', keywords)
    // }
    // return fromPromise(query.get()).pipe(map((snapshot) => {
    //   const data: IUser[] = snapshot.docs.map(doc => doc.data())
    //   console.log('data', data);
    //   return data
    // }))
    let query = firebase.firestore().collection(FIRE_COLLECTION.users)
      // .orderBy('createdAt', 'desc')
      .limit(request?.pageSize || 10)
      // .startAfter(request?.pageIndex || 0)
    // if (request?.keyword) {
    //   const keywords = request.keyword.toLowerCase().split(STRING_POOL.SPACE)
    //   query = query.where('fullName', 'array-contains', keywords)
    // }
    console.log('query', query)
    return fromPromise(query.get()).pipe(map((snapshot) => {
      console.log('snapshot', snapshot)
      const data: IUser[] = snapshot.docs.map(doc => doc.data())
      console.log('data', data);
      return data
    }))
  }
}
