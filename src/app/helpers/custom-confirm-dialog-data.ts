export interface CustomConfirmDialogData {
  title: string;
  text: string;
  confirmTrueText: string;
  confirmFalseText: string;
}

export const CUSTOM_CONFIRM_DIALOG_DATA: {
  PERFORM_MANUAL_LOGOUT: CustomConfirmDialogData;
} = {
  PERFORM_MANUAL_LOGOUT: {
    title: '',
    text: "Are You Sure You Want To Logout ?",
    confirmTrueText: 'Yes',
    confirmFalseText: 'No',
  },
};
