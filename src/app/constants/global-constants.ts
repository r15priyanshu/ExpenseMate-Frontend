import { environment } from '../../environments/environment';

export const GlobalConstants = {
  APPLICATION_NAME: 'EXPENSE-MATE',
  ADMIN_ROLE_NAME : 'ROLE_ADMIN',
  NORMAL_ROLE_NAME : 'ROLE_NORMAL',
  
  DEFAULT_PROFILE_PIC_IMAGE_NAME: 'default.png',
  DEFAULT_PROFILE_PIC_IMAGE_LOCATION: 'images/default.png',
  DEFAULT_PROFILE_PIC_IMAGE_FORM_FIELD_NAME: 'image',

  REGISTER_URL: `${environment.BACKEND_BASE_URL}/auth/register`,
  LOGIN_URL: `${environment.BACKEND_BASE_URL}/auth/login`,
  UPDATE_USER_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/${userId}` },
  UPDATE_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/updateProfilePicture/${userId}` },
  REMOVE_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/removeProfilePicture/${userId}` },
  GET_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/public/images/serveProfilePicture/users/${userId}` },
 
  USER_DETAILS_KEY_FOR_LOCAL_STORAGE: 'USER-DETAILS',

  JWT_TOKEN_HEADER_KEY: 'jwt-token',
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE: 'JWT-TOKEN',
};
