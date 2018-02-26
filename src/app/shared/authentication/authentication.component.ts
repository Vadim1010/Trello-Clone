import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models';
import { AuthenticationService } from '../../core';
import { AUTHENTICATION_CONFIG } from './authentication.config';
import { AuthenticationConfig } from './authentication.model';

@Component({
  selector: 'tt-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnDestroy {
  public errorMessagesIs: boolean = false;
  public formStatus: boolean = false;
  public config: AuthenticationConfig = AUTHENTICATION_CONFIG;

  private subscriptions: Subscription[] = [];

  constructor (private dialogRef: MatDialogRef<AuthenticationComponent>,
               private authentication: AuthenticationService) {
  }

  public onNoClick (): void {
    this.dialogRef.close();
  }

  public changeStatusForm (value: boolean): void {
    this.formStatus = value;
  }

  public ngOnDestroy (): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((elem: Subscription): void => {
        elem.unsubscribe();
      });
    }
  }

  public onLogIn (user: User): void {
    this.subscriptions.push(this.authentication.getUser(user)
      .subscribe((userIn: boolean) => {
        this.formStatus
          ? this.register(user, userIn)
          : this.logIn(userIn);
      }));
  }

  // TODO validator to server
  private register (user: User, userStatus: boolean): void {
    userStatus
      ? this.errorMessagesIs = true
      : this.subscriptions.push(this.authentication.register(user)
        .subscribe((res: boolean) => {
          this.dialogRef.close();
        }));
  }

  private logIn (userStatus: boolean): void {
    userStatus
      ? this.dialogRef.close()
      : this.errorMessagesIs = true;
  }
}
