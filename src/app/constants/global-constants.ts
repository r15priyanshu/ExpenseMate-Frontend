import { environment } from '../../environments/environment';

export const GlobalConstants = {
  APPLICATION_NAME: 'EXPENSE-MATE',
  DEFAULT_PROFILE_PIC_IMAGE_NAME: 'default.png',
  DEFAULT_PROFILE_PIC_IMAGE_LOCATION: 'images/default.png',
  DEFAULT_PROFILE_PIC_IMAGE_FORM_FIELD_NAME: 'image',

  REGISTER_URL: `${environment.BACKEND_BASE_URL}/auth/register`,
  LOGIN_URL: `${environment.BACKEND_BASE_URL}/auth/login`,

  USER_DETAILS_KEY_FOR_LOCAL_STORAGE: 'USER-DETAILS',

  JWT_TOKEN_HEADER_KEY: 'jwt-token',
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE: 'JWT-TOKEN',
};
