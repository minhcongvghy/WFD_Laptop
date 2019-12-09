import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../token-storage.service';
import {UserForm} from './user-form';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PassForm} from './pass-form';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  info: any;
  inputName = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });
  returnUrl: string;
  name: any;
  isError = false;
  error = '';
  isErrorUser = false;
  errorUser = '';
  passForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });
  constructor(private token: TokenStorageService, private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  updatePassword(closeButton: HTMLInputElement) {
    const {currentPassword, newPassword, confirmPassword} = this.passForm.value;
    if (newPassword !== confirmPassword) {
      this.isError = true;
      return this.error = 'Password confirm not match ';
    }
    const formPass = new PassForm(this.info.userId, this.info.username, currentPassword, newPassword);
    this.authService.updatePassword(formPass).subscribe(
      result => {
        console.log(result);
        closeButton.click();
        this.logout();
        this.router.navigateByUrl(this.returnUrl);
        alert('Change password successful. Please ReLogin !');
      }, error1 => {
        this.isError = true;
        this.error = 'Update password fail!';
        return console.log('error');
      }
    );
  }

  updateUser(closeButton: HTMLInputElement) {
    const {name} = this.inputName.value;

    console.log(name);

    if (name === '') {
      this.isErrorUser = true;
      return this.errorUser = 'Fail! Nothing Change.';
    }
    const userForm = new UserForm(this.info.userId, name);

    this.authService.updateUser(userForm).subscribe(
      result => {
        closeButton.click();
        console.log(result);
        this.logout();
        alert('Update successful. Please ReLogin !');
        this.router.navigateByUrl(this.returnUrl);
      }, error => {
        console.log(this.isErrorUser, this.errorUser);
        this.isErrorUser = true;
        return this.errorUser = 'Fail!.';
      }
    );
  }



  logout() {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }

}
