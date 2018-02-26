import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationComponent } from '../authentication';
import { CONFIG_MODAL } from '../../app.config';
import { AuthenticationService } from '../../core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

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
               private socialAuthService: AuthService) {
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
      width: CONFIG_MODAL.Authentication,
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

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
      }
    )
  }
}
