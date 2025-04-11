import { TransactionDto } from './TransactionDto';

export interface TransactionDetailsResponseType {
  totalTransactionsCount: number;
  totalDebit: number;
  totalCredit: number;
  total: number;
  groupedTransactions: GroupedTransactionType[];
}

export interface GroupedTransactionType {
  transactionDate: Date;
  transactions: TransactionDto[];
}
