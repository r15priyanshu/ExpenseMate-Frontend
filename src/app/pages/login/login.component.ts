import { Component } from '@angular/core';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginRequestDto } from '../../dtos/LoginRequestDto';
import { GlobalConstants } from '../../constants/global-constants';
import { UtilityComponentsService } from '../../services/utility-components.service';
import { CUSTOM_SNACK_BAR_DATA } from '../../components/utilities/custom-snackbar/CustomSnackbarData';

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

  constructor(
    private loginAndRegisterService: LoginAndRegisterService,
    private utilityComponentsService: UtilityComponentsService
  ) {}

  handleLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginData;
    const loginRequestDto = new LoginRequestDto(email, password);

    this.loginAndRegisterService.performLogin(loginRequestDto).subscribe({
      next: (response) => {
        const token = response.headers.get(GlobalConstants.JWT_TOKEN_HEADER_KEY);
        if (token) {
          this.loginAndRegisterService.performOperationsOnLogin(token,response.body)
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_SNACK_BAR_DATA.LOGIN_SUCCESS_SB_DATA)
        }
      },
      error: (error) => {
        if (error.status === 400) {
        } else if (error.status === 404) {
        } else {
        }
      },
    });
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
