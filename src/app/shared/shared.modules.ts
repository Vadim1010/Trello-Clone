import { NgModule } from '@angular/core';
import { HeaderModule } from './header';
import { AuthenticationModule } from './authentication';

const modules = [
  HeaderModule,
  AuthenticationModule
];

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class SharedModule {
}
