import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { MainComponent } from './home/main/main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileUserComponent } from './auth/profile-user/profile-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Permissions} from './protect-router/permissions';
import {CanActivateTeam} from './protect-router/can-activate-team';
import {NotActivateTeam} from './protect-router/not-activate-team';
import {IsAdmin} from './protect-router/is-admin';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LineComponent } from './line/line.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ShowProductByLineComponent } from './product/show-product-by-line/show-product-by-line.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileUserComponent,
    LineComponent,
    ProductComponent,
    CreateProductComponent,
    DetailProductComponent,
    UpdateProductComponent,
    ShowProductByLineComponent,
    ListProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [Permissions, CanActivateTeam, NotActivateTeam, IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
