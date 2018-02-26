import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationComponent } from '../authentication';
import { CONFIG_MODAL } from '../../app.config';
import { AuthenticationService, AuthenticationByFacebookService } from '../../core';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userStatus: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor (private dialog: MatDialog,
               private authentication: AuthenticationService,
               private fb: AuthenticationByFacebookService) {
  }

  public ngOnInit (): void {
    this.subscriptions.push(this.authentication.userAuthorization.subscribe(
      (userAuthorization: boolean) => {
        this.userStatus = userAuthorization;
      }
    ));
  }

  public openDialog (): void {
    let dialogRef = this.dialog.open(AuthenticationComponent, {
      width: CONFIG_MODAL.Authentication
    });
  }

  public onLogUotUser (): void {
    this.authentication.logOut();
  }

  public ngOnDestroy (): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((elem: Subscription): void => {
        elem.unsubscribe();
      });
    }
  }

  public socialSignIn (type: string): void {
    this.fb.loginUserByFB()
      .then((token) => {
        if (token) {
          this.authentication.userAuthorization.next(true);
        } else if (!!token) {
          throw Error('Error in Facebook logination!!!');
        }
      });
  }

  public onLogUotFb (): void {
    this.fb.logout();
    this.onLogUotUser();
  }
}
