import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalConstants } from '../../constants/global-constants';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { Router, RouterModule } from '@angular/router';
import { UserDto } from '../../dtos/UserDto';
import { UpperCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UtilityComponentsService } from '../../services/utility-components.service';
import { CUSTOM_CONFIRM_DIALOG_DATA } from '../../helpers/custom-confirm-dialog-data';

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
  public formattedRemainingTime: string = '';
  private userLoggedInSubscription!: Subscription;
  private sessionRemainingTimeSubscription!: Subscription;

  constructor(
    private loginAndRegisterService: LoginAndRegisterService,
    private router: Router,
    private utilityComponentsService:UtilityComponentsService
  ) {}

  ngOnInit(): void {
    console.log('Inside ngOnInit of NavbarComponent.');
    this.userLoggedInSubscription = this.loginAndRegisterService.userLoggedInSubject.subscribe((value) => {
        this.userDetails = this.loginAndRegisterService.getLoggedInUserDetails();
        this.isLoggedIn = value;
        console.log(`Inside ngOnInit of NavbarComponent: Consuming : isLoggedIn = ${this.isLoggedIn}`);
    });
   
    this.sessionRemainingTimeSubscription = this.loginAndRegisterService.sessionRemainingTimeSubject.subscribe((remainingTime)=>{
      this.formattedRemainingTime = this.getFormattedTime(remainingTime);
    })
  }

  handleLogout(){
    const matDialogRef = this.utilityComponentsService.openConfirmDialog(CUSTOM_CONFIRM_DIALOG_DATA.PERFORM_MANUAL_LOGOUT);
    matDialogRef.afterClosed().subscribe((result)=>{
      console.log(CUSTOM_CONFIRM_DIALOG_DATA.PERFORM_MANUAL_LOGOUT.text,result)
      if(result){
        console.log("!! Perform Logout !!")
      }
    })
  }

  getFormattedTime(timeInMilliSeconds:number){
    const hours = Math.floor((timeInMilliSeconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeInMilliSeconds / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMilliSeconds / 1000) % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.userLoggedInSubscription.unsubscribe();
    this.sessionRemainingTimeSubscription.unsubscribe();
  }
}
