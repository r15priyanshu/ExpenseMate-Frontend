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
  public navbarHeadingName: string = GlobalConstants.APPLICATION_NAME;
  public isUserLoggedIn: boolean = false;
  public loggedInUserDetails: UserDto | null = null;
  public formattedRemainingTime: string = '';
  private authDetailsSubscription!: Subscription;
  private sessionRemainingTimeBehaviourSubjectSubscription!: Subscription;

  constructor(
    private loginAndRegisterService: LoginAndRegisterService,
    private router: Router,
    private utilityComponentsService:UtilityComponentsService
  ) {}

  ngOnInit(): void {
    console.log('Inside ngOnInit Of NavbarComponent.');
    this.authDetailsSubscription = this.loginAndRegisterService.AuthDetailsBehaviourSubject.subscribe((value) => {
        this.isUserLoggedIn = value.isUserLoggedIn;
        this.loggedInUserDetails = value.loggedInUserDetails;
        console.log(`Inside ngOnInit Of NavbarComponent: Consuming : isUserLoggedIn : Value = ${this.isUserLoggedIn}`);
    });
   
    this.sessionRemainingTimeBehaviourSubjectSubscription = this.loginAndRegisterService.sessionRemainingTimeDisplayBehaviourSubject.asObservable().subscribe((remainingTime)=>{
      this.formattedRemainingTime = this.getFormattedTime(remainingTime);
      //console.log(`Received Remaining Time In Navbar : ${this.formattedRemainingTime}`)
    })
  }

  handleLogout(){
    const matDialogRef = this.utilityComponentsService.openConfirmDialog(CUSTOM_CONFIRM_DIALOG_DATA.PERFORM_MANUAL_LOGOUT);
    matDialogRef.afterClosed().subscribe((result)=>{
      console.log(CUSTOM_CONFIRM_DIALOG_DATA.PERFORM_MANUAL_LOGOUT.text,result)
      if(result){
        this.loginAndRegisterService.performLogout(true)
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
    this.authDetailsSubscription.unsubscribe();
    this.sessionRemainingTimeBehaviourSubjectSubscription.unsubscribe();
  }
}
