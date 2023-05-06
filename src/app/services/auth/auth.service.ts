import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/model/user/User';
import { Observable } from 'rxjs';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(protected auth: Auth) { }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (email == "error@email.com") {
          observer.error({message: "Email not found"})
        }
        observer.next();
        observer.complete();
      }, 2000)
    })
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      setTimeout(() => {
        if (email == "error@email.com") {
          observer.error({message: 'Use not found'});
          observer.next();
        } else {
          const user = new User();
          user.email = email;
          user.id = "userid";
          observer.next(user);
        }
        observer.complete();
      }, 2000);
    })
  }
}
