import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../constants/global-constants';
import { TransactionDetailsResponseType } from '../dtos/TransactionDetailsResponseType';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient) {
    console.log("Inside Constructor Of BookService !!")
  }

  public getSpecificMonthTransactionsOfUserByUserIdForSpecificBook(bookId: string, userId: string, year: number, month: number) {
    return this.http.get<TransactionDetailsResponseType>(GlobalConstants.GET_SPECIFIC_MONTH_TRANSACTIONS_OF_USER_BY_USERID_FOR_SPECIFIC_BOOK_URL(bookId,userId,year,month));
  }
}
