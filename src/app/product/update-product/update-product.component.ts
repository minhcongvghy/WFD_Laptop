import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {Line} from '../../model/line';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ProductService} from '../../services/product.service';
import {LineService} from '../../services/line.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  private idParam: any;
  product: Product;
  private lineList: Line[];
  private info: any;
  private previewId: string;
  lineId = '';
  private fileUpload: File;
  filePath: any;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private productService: ProductService,
              private lineService: LineService,
              private route: ActivatedRoute,
              private router: Router ) {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
    });
  }

  ngOnInit() {

    this.productService.findProductById(this.idParam).subscribe(
      result => {
        this.product = result;
        console.log(this.product);
      }, error => {
        console.log(error);
      }
    );

    this.lineService.getLineList().subscribe(
      result => {
        this.lineList = result;
      }, error => {
        console.log(error);
      }
    );

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
    console.log(this.filePath);
  }

  updateProduct(closeButton: HTMLInputElement) {

    if (this.product.name === '' || this.product.cpu === '' || this.product.ram === '' || this.product.price === '' || this.product.description === '') {
      return alert('Fill Data Fields !');
    }

    if (this.lineId === '') {
      this.lineId = this.product.line.id;
    }

    const product: Product = {
      id: this.product.id,
      name: this.product.name,
      cpu: this.product.cpu,
      ram: this.product.ram,
      price: this.product.price,
      description: this.product.description,
      user: {
        id: this.info.userId
      },
      line: {
        id: this.lineId
      }
    };

    this.productService.updateProduct(product).subscribe(
      result => {
        if (this.fileUpload === null || this.fileUpload === undefined ) {
          console.log('create product ok');
          closeButton.click();
          this.previewId = result.id;
        } else {
          const form = new FormData();
          form.append('file', this.fileUpload);
          this.productService.uploadFile(form, result.id).subscribe(
            next => {
              console.log('upload file ok');
              closeButton.click();
              this.previewId = result.id;
            }, error1 => {
              console.log('loi upload file');
            }
          );
        }
      }, error5 => {
        return console.log('fail create product');
      }
    );
  }

  preview(previewId: any, closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/product/' + previewId);
  }

}
