import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginAndRegisterService } from './services/login-and-register.service';
import { CategoryService } from './services/category.service';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  //SERVICES ARE REQUIRED TO BE INJECTED ANYWHERE ATLEAST ONCE FOR ITS INSTANTIATION , DONT REMOVE.
  constructor(
    private loginAndRegisterService: LoginAndRegisterService,
    private categoryService: CategoryService,
    private bookService:BookService
  ) {}

  ngOnInit(): void {
    console.log('Inside ngOnInit Of AppComponent.');
    const { isUserLoggedIn } = this.loginAndRegisterService.AuthDetailsBehaviourSubject.value;
    if (isUserLoggedIn ) {
      this.loginAndRegisterService.performOperationsOnApplicationRefresh();
    }
  }
}
