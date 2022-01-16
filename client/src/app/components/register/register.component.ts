import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { customValidators } from 'src/app/services/custom-validators.service';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _customValidators: customValidators,
    private _auth: AuthService,
    public _lists: ListsService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group(
      {
        _id: [
          '',
          [Validators.required, this._customValidators.isIsraeliIdValid],
          this._customValidators.isIDAlreadyRegistered,
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this._customValidators.emailRegex),
          ],
          this._customValidators.isEmailAlreadyRegistered,
        ],
        password: ['', [Validators.required]],
        confirmPassword: [
          '',
          [Validators.required, this._customValidators.confirmPassCheckTest],
        ],
      },
      { validator: this._customValidators.checkPasswords }
    );

    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  getIDErrorMessage() {
    if (this.firstFormGroup.hasError('required', '_id'))
      return 'You must enter a value';
    if (this.firstFormGroup.hasError('copiedID', '_id'))
      return "Can't choose that ID";
    if (this.firstFormGroup.hasError('IDInUse', '_id'))
      return 'ID already in use';
    return this.firstFormGroup.hasError('invalidID', '_id')
      ? 'Invalid ID Number'
      : '';
  }

  getEmailErrorMessage() {
    if (this.firstFormGroup.hasError('required', 'email'))
      return 'You must enter a value';
    if (this.firstFormGroup.hasError('EmailInUse', 'email'))
      return 'Email already in use';

    return this.firstFormGroup.hasError('pattern', 'email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (
      this.firstFormGroup.hasError('notSame', 'password') ||
      this.firstFormGroup.hasError('notSame', 'confirmPassword')
    )
      return 'Passwords must match';
    return this.firstFormGroup.hasError('required', 'password') ||
      this.firstFormGroup.hasError('required', 'confirmPassword')
      ? 'You must enter a value'
      : null;
  }

  getSecondGroupError() {
    return this.secondFormGroup.invalid ? 'You must enter a value' : null;
  }

  register() {
    const { email, _id, password } = this.firstFormGroup.value;
    const {
      firstName: first,
      lastName: last,
      city,
      street,
    } = this.secondFormGroup.value;
    this._auth.register({ email, _id, password, first, last, city, street });
  }
}
