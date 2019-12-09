import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {User} from '../model/user';
import {SearchUserByName} from '../model/search-user-by-name';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.userUrl;

  constructor(private http: HttpClient) { }

  getProductByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.userUrl + userId + '/product' );
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(this.userUrl + id);
  }

  searchUserByName(user: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.userUrl + 'search-by-name' , user);
  }
}
