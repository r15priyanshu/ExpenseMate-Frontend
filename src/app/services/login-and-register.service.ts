import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '../dtos/UserDto';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';
import { LoginRequestDto } from '../dtos/LoginRequestDto';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { UtilityComponentsService } from './utility-components.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAndRegisterService {
  public userLoggedInSubject: BehaviorSubject<boolean>;
  public sessionRemainingTimeDisplaySubject = new BehaviorSubject<number>(0);
  private sessionRemainingTimeDisplayIntervalSubscription!: Subscription;
  private tokenExpirationSetTimout : any = undefined;

  constructor(
    private httpClient: HttpClient,
    private utilityService: UtilityService,
    private utilityComponentsService:UtilityComponentsService,
    private router:Router
  ) {
    this.userLoggedInSubject = new BehaviorSubject<boolean>(
      this.isUserLoggedIn()
    );
  }

  registerUser(userDto: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(GlobalConstants.REGISTER_URL, userDto);
  }

  public performLogin(
    loginRequestDto: LoginRequestDto
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(
      GlobalConstants.LOGIN_URL,
      loginRequestDto,
      { observe: 'response' }
    );
  }

  public performOperationsOnLogin(token:string, userDto:UserDto){
    this.saveToken(token);
    this.saveUserDetails(userDto)
    const tokenValidityInMilliseconds = this.getTokenValidityInMilliSeconds();
    this.startSessionTimeoutDisplayTimer(tokenValidityInMilliseconds);
    this.performAutoLogout(tokenValidityInMilliseconds);
    this.userLoggedInSubject.next(true);
  }

  private saveToken(token: string) {
    this.utilityService.addItemInLocalStorage(
      GlobalConstants.JWT_TOKEN_KEY_FOR_LOCAL_STORAGE,
      token
    );
  }

  public getToken(): string | null {
    const token = this.utilityService.getItemFromLocalStorage(
      GlobalConstants.JWT_TOKEN_KEY_FOR_LOCAL_STORAGE
    );
    return token;
  }

  private saveUserDetails(userDto: UserDto): boolean {
    this.utilityService.addItemInLocalStorage(
      GlobalConstants.USER_DETAILS_KEY_FOR_LOCAL_STORAGE,
      JSON.stringify(userDto)
    );
    return true;
  }

  public getLoggedInUserDetails(): UserDto | null {
    const details = this.utilityService.getItemFromLocalStorage(
      GlobalConstants.USER_DETAILS_KEY_FOR_LOCAL_STORAGE
    );
    return details === null ? null : JSON.parse(details);
  }

  public isUserLoggedIn(): boolean {
    const token = this.getToken();
    const userDetails = this.getLoggedInUserDetails();
    return token && userDetails ? true : false;
  }

  public getTokenValidityInMilliSeconds(): number {
    console.log('Fetching Token From Local Storage And Trying To Decode Token For Extracting Token Validity !!');
    const encodedToken = this.getToken();
    let decodedToken = null;
    if (encodedToken) {
      try {
        decodedToken = jwtDecode<any>(encodedToken);
        //EXP IN JWT IS IN SECONDS , FIRST CONVERT IT INTO MILLISECONDS
        const exp = decodedToken.exp * 1000;
        const expDate = new Date(exp);
        const tokenValidity = expDate.getTime() - Date.now();
        console.log(`Token Decoded and Token Expires At : ${expDate}'and Token Valid For : ${tokenValidity} ms.`);
        return tokenValidity;
      } catch {
        console.log('Error While Decoding Token Extracting Token Validity !!');
        return 0;
      }
    } else {
      console.log('Token Not Found In Local Storage !!');
      return 0;
    }
  }

  private startSessionTimeoutDisplayTimer(tokenValidityInMilliseconds:number) {
    let tokenValidity = tokenValidityInMilliseconds;
    if(this.sessionRemainingTimeDisplayIntervalSubscription){
      console.log("Resetting Session Timeout Display Timer Subscription !!")
      this.sessionRemainingTimeDisplayIntervalSubscription.unsubscribe() 
    }

    if (tokenValidity > 0) {
      console.log("Session Timout Display Timer Started !")
      this.sessionRemainingTimeDisplayIntervalSubscription = interval(1000).subscribe(() => {
          tokenValidity = tokenValidity - 1000;
          if (tokenValidity < 0) {
            this.sessionRemainingTimeDisplayIntervalSubscription.unsubscribe();
          }else{
            this.sessionRemainingTimeDisplaySubject.next(tokenValidity);
          }
        }
      );
    }
  }

  public performLogout(isManualLogout:boolean): void {
    this.performOperationsOnLogout();
    this.router.navigate(['/login'])
    if(isManualLogout){
      console.log("Manual Logout Successful !!")
    }else{
      console.log("Auto Logout Successful !!")
    }
  }

  public performAutoLogout(expirationTimeInMilliSeconds:number): void {
    console.log("Performing Auto Logout After : ",expirationTimeInMilliSeconds," ms.")
    this.tokenExpirationSetTimout = setTimeout(()=>{
      this.performLogout(false);
    },expirationTimeInMilliSeconds);
  }

  private performOperationsOnLogout():void{
    localStorage.removeItem(GlobalConstants.JWT_TOKEN_KEY_FOR_LOCAL_STORAGE);
    localStorage.removeItem(GlobalConstants.USER_DETAILS_KEY_FOR_LOCAL_STORAGE);
    this.userLoggedInSubject.next(false)
  }
}
