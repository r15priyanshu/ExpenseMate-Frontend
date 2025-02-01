import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { confirmPasswordValidator } from '../../validators/confirm-password-validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerFormGroup: FormGroup;
  isPasswordHidden = signal(true);

  private initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private formBuilder: FormBuilder) {
    this.registerFormGroup = this.formBuilder.group(
      {
        firstName: new FormControl(this.initialFormValues.firstName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(this.initialFormValues.lastName),
        email: new FormControl(this.initialFormValues.email, [
          Validators.required,
          Validators.minLength(10),
        ]),
        password: new FormControl(this.initialFormValues.password, [
          Validators.required,
          Validators.minLength(5),
        ]),
        confirmPassword: new FormControl(
          this.initialFormValues.confirmPassword,
          [Validators.required]
        ),
      },
      { validators: confirmPasswordValidator }
    );
  }

  toggleVisibility() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  handleRegister() {
    console.log(this.registerFormGroup.value);
  }

  handleReset() {
    this.registerFormGroup.reset(this.initialFormValues);
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.registerFormGroup.controls;
  }
}
