import { Component } from '@angular/core';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Below will be used to store the actual 2 way binded data
  loginData = {
    email: '',
    password: '',
  };

  // Below will be used to provide initial values to the form again after the reset of form is done
  loginDataInitialValues = {
    email: '',
    password: '',
  };

  constructor(private loginAndRegisterService: LoginAndRegisterService) {}

  handleLogin(loginForm: NgForm) {
    console.log(this.loginData);
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
