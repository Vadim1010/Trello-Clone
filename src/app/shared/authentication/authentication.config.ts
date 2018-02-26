import { AuthenticationConfig } from './authentication.model';

export const AUTHENTICATION_CONFIG: AuthenticationConfig = {
  authorization: {
    title: 'Authorization',
    value: 'Log In',
    errorMessage: 'name or email isn\'t correct'
  },
  registration: {
    title: 'Registration',
    value: 'Save',
    errorMessage: 'Email already taken'
  }
};
