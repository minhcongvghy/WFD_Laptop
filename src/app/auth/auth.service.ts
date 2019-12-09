import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './auth-login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpInfo} from './sign-up-info';
import {environment} from '../../environments/environment';
import {UserForm} from './profile-user/user-form';
import {PassForm} from './profile-user/pass-form';
// import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // local
  private svLoginUrl = environment.loginUrl;
  private svSignUpUrl = environment.signupUrl;
  private svUpdateProfileUrl = environment.updateProfileUrl;
  private svUpdatePasswordUrl = environment.updatePasswordUrl;

  // server
  // private svLoginUrl = environment.SvLoginUrl;
  // private svSignUpUrl = environment.SvSignupUrl;
  // private svUpdateProfileUrl = environment.SvUpdateProfileUrl;
  // private svUpdatePasswordUrl = environment.SvUpdatePasswordUrl;

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.svLoginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.svSignUpUrl, info, httpOptions);
  }

  updateUser(infor: UserForm): Observable<string> {
    return this.http.put<string>(this.svUpdateProfileUrl + '/' + infor.id , infor);
  }

  updatePassword(passForm: PassForm): Observable<string> {
    return this.http.put<string>(this.svUpdatePasswordUrl + '/' + passForm.id , passForm);
  }
}
