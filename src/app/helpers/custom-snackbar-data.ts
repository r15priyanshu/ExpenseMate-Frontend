export const SNACK_BAR_DEFAULTS = {
  SB_TYPE_SUCCESS: 'success',
  SB_TYPE_ERROR: 'error',
  SB_TYPE_WARNING: 'warning',
  SB_DEFAULT_DISMISS_BTN_TXT: 'Close',
};

export interface CustomSnackbarData {
  message: string;
  performSomeActionButtonText: string | null;
  dismissSnackBarButtonText: string | null;
  snackbarType:
    | typeof SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS
    | typeof SNACK_BAR_DEFAULTS.SB_TYPE_ERROR
    | typeof SNACK_BAR_DEFAULTS.SB_TYPE_WARNING;
}

export const CUSTOM_LOGIN_SNACK_BAR_DATA: {
  LOGIN_INPUT_VALIDATION_FAILED: CustomSnackbarData;
  LOGIN_SUCCESS_SB_DATA: CustomSnackbarData;
  LOGIN_ERROR_INVALID_CREDENTIALS: CustomSnackbarData;
  LOGIN_ERROR_USER_NOT_FOUND: CustomSnackbarData;
  LOGIN_ERROR_GENERIC_MESSAGE: CustomSnackbarData;
} = {
  LOGIN_INPUT_VALIDATION_FAILED: {
    message: '!! Form Data Validations Failed. Please Provide Proper Values !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
  LOGIN_SUCCESS_SB_DATA: {
    message: '!! Successfully Logged In !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
  },
  LOGIN_ERROR_INVALID_CREDENTIALS: {
    message: '!! Invalid Password !! Password Did Not Match !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
  LOGIN_ERROR_USER_NOT_FOUND: {
    message: '!! User Not Found With Email Provided !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
  LOGIN_ERROR_GENERIC_MESSAGE: {
    message:
      '!! Something Went Wrong While Login !! Please Try After Some Time !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
};

export const CUSTOM_USER_PROFILE_SNACK_BAR_DATA: {
  USER_PROFILE_INPUT_VALIDATION_FAILED: CustomSnackbarData;
  USER_PROFILE_UPDATED_SUCCESSFULLY: CustomSnackbarData;
  USER_PROFILE_UPDATION_FAILED: CustomSnackbarData;
  USER_PROFILE_PIC_UPDATED_SUCCESSFULLY: CustomSnackbarData;
  USER_PROFILE_PIC_REMOVED_SUCCESSFULLY: CustomSnackbarData;
} = {
  USER_PROFILE_INPUT_VALIDATION_FAILED: {
    message: '!! Validation Failed !! Please Check Your Inputs !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
  USER_PROFILE_UPDATED_SUCCESSFULLY: {
    message: '!! User Profile Details Updated Successfully !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
  },
  USER_PROFILE_UPDATION_FAILED: {
    message:  '!! Something Went Wrong While Updating Profile Details !! Please Try After Some Time !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_ERROR,
  },
  USER_PROFILE_PIC_UPDATED_SUCCESSFULLY: {
    message: '!! User Profile Picture Updated Successfully !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
  },
  USER_PROFILE_PIC_REMOVED_SUCCESSFULLY: {
    message:  '!! User Profile Picture Removed Successfully !!',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
  },
};
