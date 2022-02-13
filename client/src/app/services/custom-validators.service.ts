import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class customValidators {
  emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    creditCardRegex = /^(53)(\d{14})$/

  constructor() {}

  isIsraeliIdValid(control: FormControl) {
    if (!control.value) return null;
    if (Number(control.value) === 0) return { invalidID: true }

    let strId = control.value.trim();
    // TODO example ID should return invalid in prod
    if (strId === '123456782') return null;
    if (strId.length > 9) {
      return false;
    }
    if (strId.length < 9) {
      while (strId.length < 9) strId = '0' + strId;
    }
    let counter = 0,
      rawVal,
      actualVal;
    for (let i = 0; i < strId.length; i++) {
      rawVal = Number(strId[i]) * ((i % 2) + 1);
      actualVal = rawVal > 9 ? rawVal - 9 : rawVal;
      counter += actualVal;
    }
    return counter % 10 === 0 ? null : { invalidID: true };
  }

  async isIDAlreadyRegistered(control: FormControl) {
    if (!control.value || control.pristine) return null;
    const res = await fetch('http://localhost:1000/auth/isCredentialInUse', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({ _id: control.value }),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    if (!data.credentialInUser) return null;
    return { IDInUse: true };
  }

  async isEmailAlreadyRegistered(control: AbstractControl) {
    if (!control.value || control.pristine) return null;
    const res = await fetch('http://localhost:1000/auth/isCredentialInUse', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({ email: control.value }),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    if (!data.credentialInUser) return null;
    return { EmailInUse: true };
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true };
  }

  confirmPassCheckTest(control: AbstractControl) {
    const pass = control.parent?.get('password')!.value;

    return pass === control.value ? null : { notSame: true };
  }

  async isShippingDateValid(control: AbstractControl) {
    if (!control.value || control.pristine) return null;
    const res = await fetch(
      `http://localhost:1000/lists/order?date=${control.value}`,
      {
        credentials: 'include',
      }
    );
    const data = await res.json();

    return data.err || data.orders > 2 ? { maxDeliveries: true } : null;
  }
}
