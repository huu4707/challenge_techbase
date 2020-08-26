// Read more Error object: https://jsonapi.org/format/#error-objects
interface ISourceError {
  pointer?: string;
  parameter?: string;
}

interface IErrorDetail {
  code?: string;
  source?: ISourceError;
  title: string;
  detail?: string;
}

interface IErrorMessage {
  errors: IErrorDetail[];
}

interface ISingleSuccessMessage {
  data: object;
  meta?: object;
}

/**
 * Build a success message, that will be sent to client
 *
 * @param {object} data
 * @returns {ISingleSuccessMessage}
 */
const buildSingleSuccessMessage = (data: object, meta?: object): ISingleSuccessMessage => {
  return {
    data,
    meta: meta ? meta : null
  };
};
/**
 * Build an error message, that will be sent to client
 *
 * @param {(IErrorDetail | IErrorDetail[])} error
 * @returns {IErrorMessage}
 */
const buildErrorMessage = (error: IErrorDetail | IErrorDetail[]): IErrorMessage => {
  if (Array.isArray(error)) return { errors: error };
  else return { errors: [error] };
};

export { buildSingleSuccessMessage, buildErrorMessage, IErrorDetail, ISourceError };
