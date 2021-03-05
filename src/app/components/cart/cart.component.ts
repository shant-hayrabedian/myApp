import {Component, OnDestroy, OnInit, Type} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {Shopping} from '../../interfaces/shopping.interface';
import {Good} from '../../interfaces/good.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy {
  private unsubscribe$: Subject<any> = new Subject<any>();
  cart: Shopping[] = [];
  // MODALS: {[name: string]: Type<any>} = {
  // };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCarts().pipe(takeUntil(this.unsubscribe$)).subscribe(cart => {
      this.cart = cart.map(shopping => {
        return {
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data() as {}
        };
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
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

  // public open(name) {
  //   this.modalService.open((this.MODALS)[name]);
  // }
}
