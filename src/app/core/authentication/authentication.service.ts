import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../shared/index';

@Injectable()
export class AuthenticationService {
  public userAuthorization: Subject<boolean>;

  constructor (private http: HttpClient) {
    this.userAuthorization = new BehaviorSubject<boolean>(false);
  }

  public getUser (user: User): Observable<boolean> {
    return this.http.get(`users?name=${user.name}&email=${user.email}`)
      .map((userRes: User[]) => {
        if (!!userRes[0]) {
          this.saveRegisterUser();
        }

        this.userAuthorization.next(!!userRes[0]);

        return !!userRes[0];
      });
  }

  public logOut (): void {
    sessionStorage.removeItem('token');

    this.userAuthorization.next(false);
  }

  public register (user: User): any {
    return this.http.post('users', user)
      .do(() => {
        this.userAuthorization.next(true);
      });
  }

  private saveRegisterUser (): void {
    sessionStorage.setItem('token', 'true');
  }
}
