import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {User} from '../model/user';
import {SearchUserByName} from '../model/search-user-by-name';
import {FileForm} from '../model/file-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.userUrl;
  private UserAvatarUrl = environment.UserAvatarUrl;

  constructor(private http: HttpClient) { }

  getProductByUser(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.userUrl + userId + '/product' );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.userUrl + userId);
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

  uploadUserAvatar(file: FormData, userId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.UserAvatarUrl + userId, file, {headers});
  }
}
