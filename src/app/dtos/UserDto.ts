import { RoleDto } from './RoleDto';

export class UserDto {
  public employeeId?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role?: RoleDto;

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
