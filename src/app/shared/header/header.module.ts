import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header.component';
import { AuthenticationComponent, AuthenticationModule } from '../authentication';
import { AuthService } from 'angular5-social-login';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    AuthenticationModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [HeaderComponent],
  entryComponents: [AuthenticationComponent],
  providers: [AuthService]
})
export class HeaderModule {
}
