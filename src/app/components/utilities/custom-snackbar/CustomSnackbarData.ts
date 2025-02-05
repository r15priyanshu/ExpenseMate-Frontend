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

export const CUSTOM_SNACK_BAR_DATA: {
  LOGIN_SUCCESS_SB_DATA: CustomSnackbarData;
} = {
  LOGIN_SUCCESS_SB_DATA: {
    message: 'Successfully Logged In.',
    performSomeActionButtonText: null,
    dismissSnackBarButtonText: SNACK_BAR_DEFAULTS.SB_DEFAULT_DISMISS_BTN_TXT,
    snackbarType: SNACK_BAR_DEFAULTS.SB_TYPE_SUCCESS,
  },
};
