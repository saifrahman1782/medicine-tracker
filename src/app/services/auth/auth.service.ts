import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/model/user/User';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { UserRegister } from 'src/app/model/user/UserRegister';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  register(userRegister: UserRegister) : Observable<{success: string}> {
    return new Observable<{success: string}>(observer => {
      this.auth.createUserWithEmailAndPassword(userRegister.email, userRegister.password)
        .then((firebaseUser: firebase.default.auth.UserCredential) => {
          // Save registration data to Firestore
          this.firestore.collection('users').doc(firebaseUser.user!.uid).set({
            name: userRegister.name,
            email: userRegister.email,
            telephoneNumber: userRegister.telephoneNumber,
            address: userRegister.address,
            createdAt: firebase.default.firestore.Timestamp.now()
          })
          .then(() => {
            observer.next({success: 'Registration Succesful'});
            observer.complete();
          })
          .catch(error => {
            observer.error(error);
            observer.complete();
          });
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  login(email: string, password: string) : Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(email, password).then((firebaseUser: firebase.default.auth.UserCredential) => {
          observer.next({email, id: firebaseUser.user!.uid});
        }).catch(error => {
          observer.error(error);
          observer.complete();
        })
      })
    })
  }
}
