import { Component, OnInit } from '@angular/core';
import {Line} from '../../model/line';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ProductService} from '../../services/product.service';
import {LineService} from '../../services/line.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: string;
  public lineList: Line[] = [];
  formProduct = new FormGroup({
    name: new FormControl(''),
    cpu: new FormControl(''),
    ram: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    lineId: new FormControl(''),
    file: new FormControl('')

  });
  private returnUrl: string;
  private filePath: any;

  constructor(private token: TokenStorageService,
              private productService: ProductService,
              private lineService: LineService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.lineService.getLineList().subscribe(
      result => {
        this.lineList = result;
      }, error0 => {
        alert('error get manage-line');
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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
  }


  createProduct(openButton: HTMLInputElement) {
    const {name, cpu, ram, price, description, lineId} = this.formProduct.value;

    if (name === '' || cpu === '' || ram === '' || price === '' || description === '' || lineId === '' || this.fileUpload == null || this.fileUpload === undefined) {
      return alert('Fill Data Fields !');
    }

    const product: Product = {
      name,
      cpu,
      ram,
      price,
      description,
      user: {
        id: this.info.userId
      },
      line: {
        id: lineId
      }
    };

    console.log(product);
    this.productService.createProduct(product).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.productService.uploadFile(form, result.id).subscribe(
          next => {
            console.log('upload file ok');
            openButton.click();
            this.previewId = result.id;
            this.formProduct.reset();
            this.filePath = undefined;
          }, error1 => {
            console.log('loi upload file');
          }
        );
      }, error5 => {
        return console.log('fail create product');
      }
    );
  }

  preview(closeButton: HTMLInputElement) {
    closeButton.click();
    return this.router.navigateByUrl('/product/' + this.previewId);
  }

}
