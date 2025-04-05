import { UserDto } from './UserDto';

export interface ApiResponseDto {
  timestamp?: string;
  statusCode?: number;
  message?: string;
  exceptionCode?: string;
  status?: string;
  path?: string;
  data?: Data;
}

interface Data {
  user?: UserDto;
}
