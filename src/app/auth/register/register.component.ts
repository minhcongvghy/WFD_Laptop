import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../sign-up-info';
import {AuthService} from '../auth.service';
import {TokenStorageService} from '../token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  returnUrl: string;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3),  Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });
  constructor(private authService: AuthService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  signUp() {
    const {name , username , email , password} = this.registerForm.value;
    const signUpInfoForm = new SignUpInfo(name, username, email, password);

    this.authService.signUp(signUpInfoForm).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        alert('Register Successful !');
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
        this.isSignUpFailed = true;
      }
    );
  }

}
