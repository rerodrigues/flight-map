export enum RequestStatus {
  PRISTINE = 'PRISTINE',
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface RequestError {
  message?: string;
  code?: number;
}

interface Success<T> {
  status: RequestStatus.SUCCESS;
  data: T;
}

interface Error {
  status: RequestStatus.ERROR;
  error: RequestError;
}

interface Fetching {
  status: RequestStatus.FETCHING;
}

interface Pristine {
  status: RequestStatus.PRISTINE;
}

export type RequestData<T> = Pristine | Fetching | Success<T> | Error;

export const requestPristine = (): Pristine => ({
  status: RequestStatus.PRISTINE,
});

export const requestFetching = (): Fetching => ({
  status: RequestStatus.FETCHING,
});

export const requestSuccess = <T>(successData: T): Success<T> => ({
  status: RequestStatus.SUCCESS,
  data: successData,
});

export const requestError = (message?: string, code?: number): Error => ({
  status: RequestStatus.ERROR,
  error: {
    message,
    code,
  },
});

export const isResquestPristine = <T>(data: RequestData<T>): data is Pristine => {
  return data.status === RequestStatus.PRISTINE;
};

export const isRequestFetching = <T>(data: RequestData<T>): data is Fetching => {
  return data.status === RequestStatus.FETCHING;
};

export const isRequestSuccess = <T>(data: RequestData<T>): data is Success<T> => {
  return data.status === RequestStatus.SUCCESS;
};

export const isRequestError = <T>(data: RequestData<T>): data is Error => {
  return data.status === RequestStatus.ERROR;
};
