import { Component, effect, signal } from '@angular/core';
import { BookDto } from '../../dtos/BookDto';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { GroupedTransactionType, TransactionDetailsResponseType } from '../../dtos/TransactionDetailsResponseType';

@Component({
  selector: 'app-manage-transactions',
  imports: [FormsModule],
  templateUrl: './manage-transactions.component.html',
  styleUrl: './manage-transactions.component.scss',
})
export class ManageTransactionsComponent {
  //BOOK RELATED
  books: BookDto[] = [];
  selectedBookId !:string ;

  today: Date = new Date();
  selectedDate = signal(new Date());
  currentMonthName: string = '';
  currentYear: number = 0;

  //TRANSACTIONS RELATED
  transactionDetailsResponse?:TransactionDetailsResponseType;
  groupedTransactions?:GroupedTransactionType[]

  constructor(private bookService:BookService, private categoryService:CategoryService, private transactionService:TransactionService, private loginAndRegisterService:LoginAndRegisterService){
    console.log("Inside Constructor Of ManageTransactionsComponent !!");
    effect(()=>{
      console.log("Inside Effect Of ManageTransactionsComponent !!");
      //JUST ACCESSING SELECTED DATE INSIDE EFFECT , TO REGISTER IT WITH ANGULAR SO THAT WHENEVER SIGNAL VALUE WILL CHANGE , THIS EFFECT WILL RUN.
      this.selectedDate()
      this.updateMonthAndYearForDisplay();
    });
  }

  ngOnInit(): void {
    console.log("Inside NgOnInit Of ManageTransactionsComponent !!");
    this.bookService.bookListBehaviourSubject.asObservable().subscribe(receivedBooks=>{
      this.books = receivedBooks
      //BY DEFAULT SELECTING THE PRIMARY BOOK.
      const primaryBook = this.books.find(book => book.primary);
      if (primaryBook) {
        this.selectedBookId = primaryBook.bookId;
        this.fetchTransactionsDetails();
      }
    });
  }

  handleBookChange(){
    //RESET THE SELECTED DATE WHENEVER BOOK CHANGES.
    this.selectedDate.set(new Date());
    //CALL API TO FETCH TRANSACTIONS
    this.fetchTransactionsDetails();
  }

  handleMonthAndYearChange(change: number): void {
    const newDate = new Date(this.selectedDate());
    newDate.setMonth(newDate.getMonth() + change);
    //PREVENTING FUTURE DATE
    if (newDate.getFullYear() > this.today.getFullYear() || (newDate.getFullYear() === this.today.getFullYear() && newDate.getMonth() > this.today.getMonth())) {
      // GOING TO FUTURE MONTH/YEAR NOT ALLOWED
      return;
    }
    this.selectedDate.set(newDate);
    this.fetchTransactionsDetails();
  }

  fetchTransactionsDetails(){
    if(this.books.length === 0){
      console.log("No Books Available !! Doing Nothing !!")
      return;
    }

    const year = this.selectedDate().getFullYear();
    const month = this.selectedDate().getMonth() + 1;
    const { loggedInUserDetails }= this.loginAndRegisterService.AuthDetailsBehaviourSubject.value
    this.transactionService.getSpecificMonthTransactionsOfUserByUserIdForSpecificBook(this.selectedBookId,loggedInUserDetails?.userId || '',year,month).subscribe({
      next:(response)=>{
        this.transactionDetailsResponse = response;
        this.groupedTransactions = response.groupedTransactions;
      },error:(error)=>{

      }
    });
  }

  updateMonthAndYearForDisplay(): void {
    const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    this.currentMonthName = monthNames[this.selectedDate().getMonth()];
    this.currentYear = this.selectedDate().getFullYear();
  }
}
