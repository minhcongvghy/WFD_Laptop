import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../../auth/auth-login-info';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {SearchProductByName} from '../../model/search-product-by-name';
import {Product} from '../../model/product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  info: any;
  private loginInfo: AuthLoginInfo;
  private returnUrl: string;
  name: '';
  productId: string;
  listProduct: Product[];

  constructor(private authService: AuthService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  // reloadPage() {
  //   window.location.reload();
  // }

}
