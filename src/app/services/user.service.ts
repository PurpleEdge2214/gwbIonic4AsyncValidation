import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }


  //---------------------------------------------------------------------------------------------------------
  // return a Http observable 
  // this form control does not use onBlur, so the timer on the Validator function 
  // only passes a value 1 second after the last keystroke
  //---------------------------------------------------------------------------------------------------------
  isUserNameUnique(val: string): Observable<any> {
    console.log('Going to the server:', val);
    return this.http.get<any>(`${URL}?username=${val}`)
  }

  //---------------------------------------------------------------------------------------------------------
  // return a promise
  // onBlur is set on this form control, so a value is only passed once
  //---------------------------------------------------------------------------------------------------------
  isDisplayNameUnique(val: string): Promise<any> {
    console.log('Going to the server:', val);
    return new Promise(resolve => {
      this.http.get<any>(`${URL}/?name=${val}`)
        .subscribe(res => {
          console.log('res: ', res);
          if (res.length) {
            resolve({ notUnique: true });
          } else {
            resolve({ notUnique: false });
          }
        })
    })
  }
  //---------------------------------------------------------------------------------------------------------
}
