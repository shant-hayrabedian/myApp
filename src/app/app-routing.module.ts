import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {CartComponent} from './components/cart/cart.component';
import {GoodsComponent} from './components/goods/goods.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuard} from './guards/auth.guard';
import {UserGuard} from './guards/user.guard';
import {CalendarComponent} from './components/calendar/calendar.component';



const routes: Routes = [
  {path: '', component: HomeComponent, data: {index: 0}},
  {path: 'login', component: LoginComponent, canActivate: [UserGuard], data: {index: 3}},
  {path: 'signup', component: SignupComponent, canActivate: [UserGuard], data: {index: 4}},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: {index: 1}},
  {path: 'admin', component: GoodsComponent, data: {index: 2}},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], data: {index: 0}},
  {path: '**', component: NotFoundComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
