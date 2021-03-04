import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Shopping} from '../../interfaces/shopping.interface';
import {Good} from '../../interfaces/good.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Shopping[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCarts().subscribe(cart => {
      this.cart = cart.map(shopping => {
        return {
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data() as {}
        };
      });
    });
    this.totalAmounts();
  }

  public delete(index) {
    this.cartService.deleteCart(this.cart[index].id);
  }

  public save(index) {
    this.cartService.updateCart(this.cart[index].id, this.cart[index].amount);
  }

  public total() {
    let sum = 0;
    for (const p in this.cart) {
      sum += this.cart[p].price;
    }
    return sum;
  }

  public totalCards() {
    const arr = this.cart.reduce((aggr, val, i) => {
      aggr[i] = val.price * val.amount;
      return aggr;
    }, []);
    return arr.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  public totalAmounts() {
    const arr = this.cart.reduce((aggr, val, i) => {
      aggr[i] =  val.amount;
      return aggr;
    }, []);
    return arr.reduce((a, b) => {
      return a + b;
    }, 0);
  }
}
