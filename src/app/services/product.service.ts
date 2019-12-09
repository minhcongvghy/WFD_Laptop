import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {FileForm} from '../model/file-form';
import {SearchProductByName} from '../model/search-product-by-name';
import {SearchProductByNameAndLine} from '../model/search-product-by-name-and-line';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private productUrl = environment.productUrl;
  private uploadFileUrl = environment.productUploadFileUrl;

  getListProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product);
  }

  uploadFile(file: FormData, productId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.uploadFileUrl + productId, file, {headers});
  }

  findProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.productUrl + id);
  }

  deleteProductById(id: string): Observable<void> {
    return this.http.delete<void>(this.productUrl + id);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productUrl + product.id, product);
  }

  searchProductByName(name: SearchProductByName): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + 'search-by-name', name);
  }

  searchProductByLineAndName(searchForm: SearchProductByNameAndLine): Observable<Product[]> {
    return this.http.post<Product[]>(this.productUrl + 'search-by-line-and-name' , searchForm);
  }
}
