import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean;

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  public login(form) {
    const data = form.value;
    this.as.login(data.email, data.password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
      // .catch(this.toast.remove())
  }
  public showPasswordButton() {
    this.showPassword = !this.showPassword;
  }

}
