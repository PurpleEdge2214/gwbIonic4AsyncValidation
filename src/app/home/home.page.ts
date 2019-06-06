import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { uniqueDisplayName, uniqueUserName } from '../validators/unique_user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public registerForm: FormGroup;

  constructor(
    private userService: UserService
  ) {

    this.registerForm = new FormGroup({

      userName: new FormControl(
        null,
        [Validators.required, Validators.minLength(4)],
        [uniqueUserName(this.userService, 1000)]
      ),

      displayName: new FormControl(
        null,
        {
          validators: [Validators.required, Validators.minLength(4)],
          asyncValidators: [uniqueDisplayName(this.userService, 0)],
          updateOn: 'blur'
        }
      )
    });
  }

  // use getters to simplify control names in the html form
  // prefix with g so it is clear where they are used
  get gUserName() { return this.registerForm.controls["userName"]; }
  get gDisplayName() { return this.registerForm.controls["displayName"]; }


  onRegister() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      console.log('form invalid, not submitted', this.registerForm);
      return;
    }
    console.log('submitting the form to the server');
  }

}
