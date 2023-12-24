import { Injectable, inject } from '@angular/core';
import { defer, from, of} from 'rxjs';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { AUTH } from '../../app.config';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(AUTH);

  getUser$ = authState(this.auth);

  login(credentials: Credentials) {
    return from(
      defer(() =>
        signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      )
    );
  }

  logout() {
    signOut(this.auth);
    return of('Logout');
  }

  createAccount(credentials: Credentials) {
    return from(
      defer(() => createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password))
    );
  }
}
