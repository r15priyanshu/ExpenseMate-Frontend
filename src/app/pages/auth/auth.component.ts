import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { UserService } from '../../services/user.service';
import { UtilityService } from '../../services/utility.service';
import { UtilityComponentsService } from '../../services/utility-components.service';
import { CUSTOM_LOGIN_SNACK_BAR_DATA } from '../../helpers/custom-snackbar-data';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginAndRegisterService: LoginAndRegisterService,
    private userService: UserService,
    private utilityService: UtilityService,
    private utilityComponentsService: UtilityComponentsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        console.log('Social Login Successful !! Temporarily Storing Token !! Extracting Subject !!');
        this.loginAndRegisterService.saveToken(token);
        const email = this.utilityService.extractClaimFromToken(token, 'sub');
        if (email) {
          console.log('Subject (Email) Found In Token, Fetching User Details Now !!');
          this.userService.getUserByEmail(email).subscribe((next) => {
            this.loginAndRegisterService.performOperationsOnLogin(token,next);
            this.utilityComponentsService.openCustomSnackBar(CUSTOM_LOGIN_SNACK_BAR_DATA.LOGIN_SUCCESS_SB_DATA);
            this.router.navigate(['/profile']);
          });
        }
      }
    });
  }
}
