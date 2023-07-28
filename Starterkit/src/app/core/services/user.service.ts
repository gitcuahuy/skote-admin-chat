import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser, User} from '../models/auth.models';
import {EMPTY, Observable, of} from "rxjs";
import {FIRE_COLLECTION} from "@shared/auth/constants/document.constants";
import {fromPromise} from "rxjs/internal-compatibility";
import {map, take} from "rxjs/operators";
import {ISearchWithPaginationOptionally} from "@shared/models/base-request.model";
import firebase from "firebase";
import CommonUtils from "@shared/utils/CommonUtils";

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
    let query: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase.firestore().collection(FIRE_COLLECTION.users)
      .orderBy('search_fullName', 'desc')
    if (request.keyword) {
      const keyword = CommonUtils.removeAccents(request.keyword).toLowerCase();
      // query = query.where('search_fullName', '>=', keyword)
      //   .where('search_fullName', '<=', keyword + '\uf8ff')
      query = query.where('search_partials', 'array-contains', keyword)
    }
    query = query.limit(request?.pageSize || 10)
    console.log('query', query)
    return fromPromise(query.get()).pipe(map((snapshot) => {
      console.log('snapshot', snapshot)
      const data: IUser[] = snapshot.docs.map(doc => doc.data())
      console.log('data', data);
      return data
    }), take(1))
  }

  createIndex(): Observable<any> {
    const batch = fromPromise(firebase.firestore().collection(FIRE_COLLECTION.users)
      .get())
      .pipe(map((snapshot) => {
        snapshot.docs.map((doc) => {
          const data: IUser = doc.data()
          data.search_fullName = CommonUtils.removeAccents(data.fullName?.toLowerCase())
          data.search_partials = CommonUtils.partialSearchField(data.fullName?.toLowerCase())
          console.log('data', data)
          firebase.firestore().collection(FIRE_COLLECTION.users).doc(doc.id).update({
            search_fullName: data.search_fullName,
            search_partials: data.search_partials,
          })
        })
      }))
    return batch
  }
}
