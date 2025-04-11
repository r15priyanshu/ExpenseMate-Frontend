export interface BookDto {
  bookId: string;
  bookName: string;
  bookDescription: string;
  bookOwner: string;
  primary: boolean,
  createdAt: Date;
}
