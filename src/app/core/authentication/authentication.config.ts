import { FbModel } from './authentication.models';

export const FB: FbModel = {
  initParams: {
    appId: '2136401339979486',
    xfbml: true,
    cookie: true,
    version: 'v1.0'
  },
  statuses: {
    loggined: 'connected'
  }
};
