export interface FbInitParams {
  appId: string;
  xfbml: boolean;
  cookie: boolean;
  version: string;
}

export interface FbStatuses {
  loggined: string;
}

export interface FbModel {
  initParams: FbInitParams;
  statuses: FbStatuses;
}
