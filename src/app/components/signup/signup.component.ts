import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interface';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = '';
  showPassword: boolean;
  showConfirmPassword: boolean;

  constructor(private as: AuthService, private us: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public signup(form) {
    const data: User = form.value;
    this.as.signup(data.email, data.password)
      .then(res => {
        this.errorMessage = '';
        this.us.addNewUser(res.user.uid, data.name, data.address)
          .then(() => {
            this.router.navigate(['/']);
          });

      })
      .catch(err => {
        this.errorMessage = err.message;
      });
  }

  public showPasswordButton() {
    this.showPassword = !this.showPassword;
  }

  public showConfirmPasswordButton() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
