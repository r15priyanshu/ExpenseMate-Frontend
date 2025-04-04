import { Component } from '@angular/core';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginRequestDto } from '../../dtos/LoginRequestDto';
import { GlobalConstants } from '../../constants/global-constants';
import { UtilityComponentsService } from '../../services/utility-components.service';
import { CUSTOM_LOGIN_SNACK_BAR_DATA } from '../../helpers/custom-snackbar-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Below Will Be Used To Store The Actual 2 Way Binded Data
  loginData = {
    email: '',
    password: '',
  };

  // Below Will Be Used To Provide Initial Values To The Form Again After The Reset Of Form Is Done
  loginDataInitialValues = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private loginAndRegisterService: LoginAndRegisterService,
    private utilityComponentsService: UtilityComponentsService
  ) {}

  handleLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_INPUT_VALIDATION_FAILED)
      return;
    }

    const { email, password } = this.loginData;
    const loginRequestDto = new LoginRequestDto(email, password);

    this.loginAndRegisterService.performLogin(loginRequestDto).subscribe({
      next: (response) => {
        const token = response.headers.get(GlobalConstants.JWT_TOKEN_HEADER_KEY);
        if (token) {
          this.loginAndRegisterService.performOperationsOnLogin(token,response.body);
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_SUCCESS_SB_DATA);
          this.router.navigate(['/profile']);
        }
      },
      error: (error) => {
        if (error.status === 400) {
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_ERROR_INVALID_CREDENTIALS);
        } else if (error.status === 404) {
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_ERROR_USER_NOT_FOUND);
        } else {
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_ERROR_GENERIC_ERROR);
        }
      },
    });
  }

  handleReset(loginForm: NgForm) {
    loginForm.reset(this.loginDataInitialValues);
  }
}
