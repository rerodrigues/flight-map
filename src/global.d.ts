// enum RequestType {
//   PRISTINE = 'PRISTINE',
//   FETCHING = 'FETCHING',
//   SUCCESS = 'SUCCESS',
//   ERROR = 'ERROR',
// }

// interface RequestPristine {
//   status: RequestType.PRISTINE;
// }

// interface RequestFetching {
//   status: RequestType.FETCHING;
// }

// interface RequestSuccess<T> {
//   status: RequestType.SUCCESS;
//   data: T;
// }

// interface RequestError {
//   status: RequestType.ERROR;
//   error: Error;
// }

// type RequestData<T> = RequestSuccess<t> | RequestError | RequestFetching | RequestPristine;
