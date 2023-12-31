import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../_models/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private url = "http://localhost:8080";
  private route = "/product-image";

  constructor(private http: HttpClient) { }

  createProductImage(product_image: any) {
    return this.http.post(this.url + this.route, product_image);
  }
  
  deleteProductImage(productImageId: number){
    const url = `${this.url}/${this.route}/${productImageId}`;
    return this.http.delete(url);
  }
  
  getProductImages(product_id: number) {
    return this.http.get<ProductImage[]>(this.url + this.route + "/" + product_id);
  }

  getProductImage(productId: number) {
    const apiUrl = `${this.url}/${this.route}/${productId}`;
    return this.http.get<ProductImage[]>(apiUrl); 
  }

  uploadProductImage(productImage: ProductImage) {
    return this.http.post(`${this.url}${this.route}`, productImage);
  }

  updateProductImage(product_image: ProductImage) {
    return this.http.put(this.url + this.route, product_image);
  }
}

