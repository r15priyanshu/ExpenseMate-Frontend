import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/UserDto';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';

@Injectable({
  providedIn: 'root',
})
export class LoginAndRegisterService {
  constructor(private httpClient: HttpClient) {}

  registerUser(userDto: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(GlobalConstants.REGISTER_URL, userDto);
  }
}
