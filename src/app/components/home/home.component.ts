import {Component, OnDestroy, OnInit} from '@angular/core';
import {Good} from '../../interfaces/good.interface';
import {GoodsService} from '../../services/goods.service';
import {Subscription} from 'rxjs';
import {CartService} from '../../services/cart.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // goods: Good[] = [
  //   {name: 'apple', price: 5, photoUrl: 'assets/apple.jpg'},
  //   {name: 'banana', price: 5, photoUrl: 'assets/banana.jpg'},
  //   {name: 'mango', price: 5, photoUrl: 'assets/mango.jpg'},
  //   {name: 'strawberry', price: 5, photoUrl: 'assets/strawberry.jpg'},
  // ];
  goods: Good[] = [];
  goodsObservable: Subscription;
  add = -1;
  constructor(private gs: GoodsService, private cartSerive: CartService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.goodsObservable = this.gs.getAllGoods().subscribe(data => {
      this.goods = data.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as {}
        };
      });
    });
  }

  ngOnDestroy() {
    this.goodsObservable.unsubscribe();
  }

  public addToCart(index) {
    if (this.authService.userId) {
      this.add = +index;
    } else {
      this.router.navigate(['/login']);
    }
  }

  public buy(amount) {
    const selectedGood = this.goods[this.add];
    const data = {
      name: selectedGood.name,
      amount: +amount,
      price: selectedGood.price
    };
    this.cartSerive.addToCart(data).then(() => this.add = -1);
  }

  public close() {
    this.add = -1;
  }
}
