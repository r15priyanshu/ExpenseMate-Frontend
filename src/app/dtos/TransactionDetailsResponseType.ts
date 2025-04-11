import { TransactionDto } from './TransactionDto';

export interface TransactionDetailsResponseType {
  totalTransactionsCount: number;
  totalDebit: number;
  totalCredit: number;
  total: number;
  transactions: TransactionDto[];
}
