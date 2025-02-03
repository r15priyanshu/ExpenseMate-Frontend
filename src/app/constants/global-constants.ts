import { environment } from '../../environments/environment';

export const GlobalConstants = {
  REGISTER_URL: `${environment.BACKEND_BASE_URL}/auth/register`,
  LOGIN_URL: `${environment.BACKEND_BASE_URL}/auth/login`,

  USER_DETAILS_KEY_FOR_LOCAL_STORAGE: 'USER-DETAILS',

  JWT_TOKEN_HEADER_KEY: 'jwt-token',
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE: 'JWT-TOKEN',
};
