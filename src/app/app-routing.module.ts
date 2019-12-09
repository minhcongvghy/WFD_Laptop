import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {NotActivateTeam} from './protect-router/not-activate-team';
import {RegisterComponent} from './auth/register/register.component';
import {LineComponent} from './line/line.component';
import {IsAdmin} from './protect-router/is-admin';
import {ProductComponent} from './product/product.component';
import {CreateProductComponent} from './product/create-product/create-product.component';
import {DetailProductComponent} from './product/detail-product/detail-product.component';
import {UpdateProductComponent} from './product/update-product/update-product.component';
import {ListProductComponent} from './product/list-product/list-product.component';
import {ProfileUserComponent} from './auth/profile-user/profile-user.component';
import {CanActivateTeam} from './protect-router/can-activate-team';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotActivateTeam]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotActivateTeam]
  },
  {
    path: 'manageLine',
    component: LineComponent,
    canActivate: [IsAdmin]
  },
  {
    path: 'manageProduct',
    component: ProductComponent,
    canActivate: [IsAdmin]
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
    canActivate: [IsAdmin]
  },
  {
    path: 'product/:id',
    component: DetailProductComponent,
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    canActivate: [IsAdmin]
  },
  {
    path: 'list-product',
    component: ListProductComponent
  },
  {
    path: 'profile',
    component: ProfileUserComponent,
    canActivate: [CanActivateTeam]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
