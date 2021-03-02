import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  isUser = false;
  isAdmin = false;

  constructor(private as: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.as.user.subscribe(user => {
      if (user) {
        this.isUser = true;
        this.as.userId = user.uid;
        this.userService.getUserData().subscribe( data => {
          if (data['admin']) {
            this.isAdmin = true;
          }
        });
      } else {
        this.isUser = false;
        this.as.userId = '';
      }
    });
  }

  public toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  public logout() {
    this.as.logout();
    window.location.reload();
  }
}
