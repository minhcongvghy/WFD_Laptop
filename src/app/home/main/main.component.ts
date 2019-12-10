import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {TokenStorageService} from '../../auth/token-storage.service';
import {SearchProductByName} from '../../model/search-product-by-name';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private listProduct: Product[] = [];
  private productList: Product[] = [];
  private role: string;
  name: '';

  constructor(private productService: ProductService,
              private token: TokenStorageService) {
    this.role = this.token.getAuthorities()[0];
  }

  ngOnInit() {
    this.getProductList();
    this.getListProduct();
  }

  getListProduct() {
    this.productService.getListProduct().subscribe(
      result => {
        this.productList = result;
      }, error => {
        alert('error get product');
      }
    );
  }

  getProductList() {
    this.productService.getListProduct().subscribe(
      result => {
        this.listProduct = result;
      }, error => {
        alert('error get product');
      }
    );
  }

  searchByName() {
    const searchForm: SearchProductByName = {
      name: this.name
    };
    this.productService.searchProductByName(searchForm).subscribe(
      result => {
        this.listProduct = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }
}
