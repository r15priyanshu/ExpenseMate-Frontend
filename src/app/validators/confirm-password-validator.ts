import { AbstractControl, ValidationErrors } from '@angular/forms';

/*This validator requires information from 2 controls, Hence it will be applied at formGroup Level,
Hence here the argument to this function will represent the complete formGroup.
Also, the error returned will be at formGroup Level.

NOTE : Return null if validation passes else return an error object , and as this error will be propagated
at formGroup level , hence it will be available at form group level only */

export function confirmPasswordValidator(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');
  const CONFIRM_PASSWORD_VALIDATION_ERROR_KEY = 'confirmPasswordMismatch';

  // Ensuring both controls exist
  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }

  return { [CONFIRM_PASSWORD_VALIDATION_ERROR_KEY]: true };
}
