import { CategoryDto } from './CategoryDto';

export class TransactionDto {
  transactionId?: string;
  transactionAmount?: number;
  transactionDate?: Date;
  transactionDescription?: string;
  transactionType?: string;
  category?: CategoryDto;
  userId?: string;
  bookId?: string;
}
