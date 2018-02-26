import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header.component';
import { AuthenticationComponent, AuthenticationModule } from '../authentication';
import { AuthenticationByFacebookService } from '../../core';

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
  providers: [AuthenticationByFacebookService]
})
export class HeaderModule {
}
