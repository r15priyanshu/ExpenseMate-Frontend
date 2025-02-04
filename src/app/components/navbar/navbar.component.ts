import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalConstants } from '../../constants/global-constants';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { Router, RouterModule } from '@angular/router';
import { UserDto } from '../../dtos/UserDto';
import { UpperCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, UpperCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navBarHeadingName: string = GlobalConstants.APPLICATION_NAME;
  public isLoggedIn: boolean = false;
  public userDetails: UserDto | null = null;
  private userLoggedInSubscription!: Subscription;

  constructor(
    private loginAndRegisterService: LoginAndRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Inside ngOnInit of NavbarComponent.');
    this.userLoggedInSubscription =
      this.loginAndRegisterService.userLoggedInSubject.subscribe((value) => {
        this.userDetails =
          this.loginAndRegisterService.getLoggedInUserDetails();
        this.isLoggedIn = value;
        console.log(
          'Inside ngOnInit of NavbarComponent: Consuming : isLoggedIn = ',
          this.isLoggedIn
        );
      });
  }

  handleLogout() {}

  ngOnDestroy(): void {
    this.userLoggedInSubscription.unsubscribe();
  }
}
