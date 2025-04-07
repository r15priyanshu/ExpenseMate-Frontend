import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-transactions',
  imports: [],
  templateUrl: './manage-transactions.component.html',
  styleUrl: './manage-transactions.component.scss',
})
export class ManageTransactionsComponent {
  today: Date = new Date();
  selectedDate: Date = new Date();
  currentMonthName: string = '';
  currentYear: number = 0;

  totalCredit: number = 0.0;
  totalDebit: number = 0.0;
  total: number = 0.0;

  ngOnInit(): void {
    this.updateMonthAndYear();
  }

  handleAddTransaction(): void {
    console.log(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
  }

  handleMonthAndYearChange(change: number): void {
    const newDate = new Date(this.selectedDate);
    newDate.setMonth(newDate.getMonth() + change);

    //PREVENTING FUTURE DATE
    if (
      newDate.getFullYear() > this.today.getFullYear() ||
      (newDate.getFullYear() === this.today.getFullYear() &&
        newDate.getMonth() > this.today.getMonth())
    ) {
      // GOING TO FUTURE MONTH/YEAR NOT ALLOWED
      return;
    }

    this.selectedDate = newDate;
    this.updateMonthAndYear();
  }

  updateMonthAndYear(): void {
    const monthNames = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    this.currentMonthName = monthNames[this.selectedDate.getMonth()];
    this.currentYear = this.selectedDate.getFullYear();
  }
}
