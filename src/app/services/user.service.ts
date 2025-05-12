import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/UserDto';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';
import { ApiResponseDto } from '../dtos/ApiResponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email:string):Observable<UserDto>{
    return this.httpClient.get<UserDto>(GlobalConstants.GET_USER_BY_EMAIL_URL(email));
  }

  updateUserByUserId(userId:string,userDto:UserDto):Observable<UserDto>{
    return this.httpClient.put<UserDto>(GlobalConstants.UPDATE_USER_BY_USERID_URL(userId),userDto);
  }

  removeProfilePicturByUserId(userId:string):Observable<ApiResponseDto>{
    return this.httpClient.get<ApiResponseDto>(GlobalConstants.REMOVE_PROFILE_PICTURE_BY_USERID_URL(userId));
  }

  updateProfilePictureByUserId(userId:string,formData:FormData):Observable<ApiResponseDto>{
    return this.httpClient.post<ApiResponseDto>(GlobalConstants.UPDATE_PROFILE_PICTURE_BY_USERID_URL(userId),formData);
  }

}
