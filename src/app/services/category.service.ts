import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { CategoryDto } from '../dtos/CategoryDto';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../constants/global-constants';
import { LoginAndRegisterService } from './login-and-register.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categoryListBehaviourSubject = new BehaviorSubject<CategoryDto[]>([]);

  constructor(
    private http: HttpClient, 
    private loginAndRegisterService: LoginAndRegisterService) {
    console.log("Inside Constructor Of CategoryService !!")
    //WHENEVER USER-DETAILS CHANGES , WILL UPDATE THE CATEGORIES LIST, WILL WORK ON PAGE REFRESH ALSO.
    loginAndRegisterService.AuthDetailsBehaviourSubject.asObservable().subscribe(
      () => {
        console.log("Auth Details Changed !! Checking If Categories Update Is Required !!")
        this.updateCategoryList();
      }
    );
  }

  public getCategoriesByUserId(userId: string) {
    return this.http.get<CategoryDto[]>(
      GlobalConstants.GET_CATEGORIES_BY_USERID_URL(userId)
    );
  }

  public categoryReloadRequired(value:boolean){
    if(value){
      this.updateCategoryList()
    }
  }

  private updateCategoryList() {
    const { isUserLoggedIn, loggedInUserDetails } = this.loginAndRegisterService.AuthDetailsBehaviourSubject.value;
    if (isUserLoggedIn && loggedInUserDetails?.userId) {
      console.log("User Is Logged In , Updating Categories Now !!")
      this.getCategoriesByUserId(loggedInUserDetails.userId).subscribe(
        (next) => {
          this.categoryListBehaviourSubject.next(next);
        }
      );
    }else{
      console.log("User Not Logged In , Skipping Categories Fetch !!")
    }
  }
}
