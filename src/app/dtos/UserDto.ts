import { BookDto } from './BookDto';
import { RoleDto } from './RoleDto';
import { TransactionDto } from './TransactionDto';

export class UserDto {
  public userId?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public profilePic?: string;
  public role?: RoleDto;
  public transactions?: TransactionDto;
  public books?: BookDto;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
