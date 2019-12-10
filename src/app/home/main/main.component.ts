import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {TokenStorageService} from '../../auth/token-storage.service';
import {SearchProductByName} from '../../model/search-product-by-name';
import {SearchProductByLineId} from '../../model/search-product-by-line-id';
import {Line} from '../../model/line';
import {ActivatedRoute} from '@angular/router';
import {LineService} from '../../services/line.service';
import {SearchProductByNameAndLine} from '../../model/search-product-by-name-and-line';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private listProduct: Product[] = [];
  private productList: Product[] = [];
  private listLine: Line[] = [];
  private role: string;
  id: string;
  lineId = null;
  name = null;

  constructor(private productService: ProductService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private lineService: LineService) {
    this.role = this.token.getAuthorities()[0];
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getListProduct();
    this.getProductList();
    this.getListLine();
    if (this.id === '0') {
      this.searchProduct();
    } else {
      this.getListProductByLineId(this.id);
    }
  }

  getListProductByLineId(id: string) {
    if (this.id == null) {
      return;
    } else {
      this.productService.searchProductByLineId(this.id).subscribe(
        result => {
          this.listProduct = result;
          this.id = null;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getListLine() {
    this.lineService.getLineList().subscribe(
      result => {
        this.listLine = result;
      }, error => {
        console.log(error);
      }
    );
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

  searchProduct() {
    const searchForm: SearchProductByNameAndLine = {
      lineId: this.lineId,
      name: this.name
    };
    this.productService.searchProductByLineAndName(searchForm).subscribe(
      result => {
        this.listProduct = result;
      }, error => {
        console.log(error);
      }
    );
  }

  // searchByName() {
  //   const searchForm: SearchProductByName = {
  //     name: this.name
  //   };
  //   this.productService.searchProductByName(searchForm).subscribe(
  //     result => {
  //       this.listProduct = result;
  //       console.log(result);
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }
  //
  // // search product by line id
  // searchProductByLineId() {
  //   const searchFormLine: SearchProductByLineId = {
  //     lineId: this.lineId
  //   };
  //   this.productService.searchProductByLineId(searchFormLine).subscribe(
  //     result => {
  //       this.listProduct = result;
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }
}
