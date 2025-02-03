import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/UserDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';
import { LoginRequestDto } from '../dtos/LoginRequestDto';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAndRegisterService {
  public userLoggedInSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private utilityService: UtilityService
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

  public saveToken(token: string) {
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

  public saveUserDetails(userDto: UserDto): boolean {
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
}
