import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

// the service we call is passed in the Async Validator from the Reactive form
// it is imported here to avoid errors appearing in the editor
import { UserService } from '../services/user.service';

//----------------------------------------------------------
// Below functions use a Timer in validator which ensures only one value 
// is sent to validation service, after the passed time has expired - defaults to 1 second below
//----------------------------------------------------------
//----------------------------------------------------------
// Call the service to check if userName is unique
// returns a http observable which we need to evaluate here using .pipe and map.
// With the web service used in this example, an empty array is returned 
// if the userName does not already exist on the server.
// Return an object with a notUnique property, or null if it is unique.
//----------------------------------------------------------
export const uniqueUserName = (userService: UserService, timeDelay: number = 1000) => {
  return (control: FormControl) => {
    return timer(timeDelay).pipe(
      switchMap(() => userService.isUserNameUnique(control.value)),
      map(res => {
        if (res.length) {
          return (!res[0].id) ? null : { notUnique: true };
        } else {
          return null;
        }
      })
    );
  };
};

//----------------------------------------------------------
// In this validator the response from the server is evaluated in the service
// so we just need to return the "notUnique" response from the service
// as an object with a notUnique property, or null if it is unique
//----------------------------------------------------------
export const uniqueDisplayName = (userService: UserService, timeDelay: number = 1000) => {
  return (control: FormControl) => {
    return timer(timeDelay).pipe(
      switchMap(() => userService.isDisplayNameUnique(control.value)),
      map(res => {
        return res.notUnique ? { notUnique: true } : null;
      })
    );
  };
};
//----------------------------------------------------------

