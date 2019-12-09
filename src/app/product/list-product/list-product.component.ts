import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ProductService} from '../../services/product.service';
import {SearchProductByName} from '../../model/search-product-by-name';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  name: '';
  productId: string;
  listProduct: Product[];

  constructor(private token: TokenStorageService,
              private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
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

  getProductId(id: string) {
    this.productId = id;
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

  deleteProductById(closeButton: HTMLInputElement) {
    this.productService.deleteProductById(this.productId).subscribe(
      result => {
        closeButton.click();
        this.getProductList();
      }, error => {
        console.log(error);
      }
    );
  }

}
