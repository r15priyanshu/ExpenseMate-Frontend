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
  GITHUB_AUTHORIZATION_INITIATION_END_POINT : `${environment.BACKEND_BASE_URL}/oauth2/authorization/github`,
  GET_USER_BY_EMAIL_URL : (email:string) => { return `${environment.BACKEND_BASE_URL}/users/email/${email}` },
  UPDATE_USER_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/${userId}` },
  UPDATE_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/updateProfilePicture/${userId}` },
  REMOVE_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/users/removeProfilePicture/${userId}` },
  GET_PROFILE_PICTURE_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/public/images/serveProfilePicture/users/${userId}` },
  GET_CATEGORIES_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/categories/users/${userId}` },
  GET_BOOKS_BY_USERID_URL : (userId:string) => { return `${environment.BACKEND_BASE_URL}/books/users/${userId}` },
  GET_SPECIFIC_MONTH_TRANSACTIONS_OF_USER_BY_USERID_FOR_SPECIFIC_BOOK_URL : (bookId: string, userId: string, year: number, month: number) => { return `${environment.BACKEND_BASE_URL}/transactions/books/${bookId}/users/${userId}/year/${year}/month/${month}` },
  DELETE_TRANSACTION_BY_TRANSACTIONID_URL : (transactionId: string) => { return `${environment.BACKEND_BASE_URL}/transactions/${transactionId}` },


  USER_DETAILS_KEY_FOR_LOCAL_STORAGE: 'USER-DETAILS',

  JWT_TOKEN_HEADER_KEY: 'jwt-token',
  JWT_TOKEN_KEY_FOR_LOCAL_STORAGE: 'JWT-TOKEN',
};
