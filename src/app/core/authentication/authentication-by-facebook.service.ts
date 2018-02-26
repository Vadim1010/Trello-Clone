import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { FB } from './authentication.config';

@Injectable()
export class AuthenticationByFacebookService {
  private token: string = '';

  constructor(private fb: FacebookService) {
  }

  loginUserByFB(): Promise<string> {
    this.fb.init(FB.initParams);

    return this.fb.getLoginStatus().then((res): Promise<string> => {
      if (res.status === FB.statuses.loggined) {
        return this.fb.logout().then((): Promise<string> => {
          return this.logInFB();
        });
      } else {
        return this.logInFB();
      }
    })
      .catch((error) => error);
  }

  public logout(): void {
    this.fb.getLoginStatus().then((res) => {
      if (res.status === FB.statuses.loggined) {
        this.fb.logout().then(() => console.log('Logged out!!!!!'));
      }
    });
  }

  private logInFB(): Promise<string> {
    return this.fb.login()
      .then((response: LoginResponse): string => {
        if (response.authResponse.accessToken) {
          this.token = response.authResponse.accessToken;
        }

        return this.token;
      });
  }
}
