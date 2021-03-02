import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Good} from '../../interfaces/good.interface';
import {GoodsService} from '../../services/goods.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  @ViewChild('image') image: ElementRef;
  constructor(private goodService: GoodsService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewGood(form: NgForm) {
    const name = (form.value as Good).name,
     price = (form.value as Good).price,
      image = (this.image.nativeElement as HTMLInputElement).files[0];
    this.goodService.addNewGood(name, price, image).then(msg => console.log(msg));
    this.router.navigate(['/']);
  }
}
