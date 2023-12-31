import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoCartDetails } from '../_dtos/dto-cart-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080";
  private route = "/cart";

  constructor(private http: HttpClient) { }
  
  addToCart(cart: any) {
    return this.http.post(this.url + this.route, cart);
  }

  deleteCart(rfc: string) {
    return this.http.delete(this.url + this.route + "/clear" + rfc);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función getCart() */
  getCart(rfc: string) {
    return this.http.get<DtoCartDetails[]>(this.url + this.route + "/" + rfc)
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart(id: number) {
    return this.http.delete<DtoCartDetails[]>(this.url + this.route + "/" + id)
  }
}
