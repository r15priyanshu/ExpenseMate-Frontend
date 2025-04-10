import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../constants/global-constants';
import { LoginAndRegisterService } from './login-and-register.service';
import { BookDto } from '../dtos/BookDto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public bookListBehaviourSubject = new BehaviorSubject<BookDto[]>([]);

  constructor(
    private http: HttpClient, 
    private loginAndRegisterService: LoginAndRegisterService) {
    console.log("Inside Constructor Of BookService !!")

    //WHENEVER USER-DETAILS CHANGES , WILL UPDATE THE BOOKS LIST, WILL WORK ON PAGE REFRESH ALSO.
    loginAndRegisterService.AuthDetailsBehaviourSubject.asObservable().subscribe(
      () => {
        console.log("Auth Details Changed !! Updating Books !!")
        this.performBookReload()
      }
    );
  }

  public getBooksByUserId(userId: string) {
    return this.http.get<BookDto[]>(GlobalConstants.GET_BOOKS_BY_USERID_URL(userId));
  }

  public performBookReload(){
    this.updateBookList()
  }

  private updateBookList() {
    const { isUserLoggedIn, loggedInUserDetails } = this.loginAndRegisterService.AuthDetailsBehaviourSubject.value;
    if (isUserLoggedIn && loggedInUserDetails?.userId) {
      this.getBooksByUserId(loggedInUserDetails.userId).subscribe(
        (next) => {
          this.bookListBehaviourSubject.next(next);
        }
      );
    }
  }
}
