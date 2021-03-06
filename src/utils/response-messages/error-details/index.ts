import { IErrorDetail, ISourceError } from '../responses';
import { generalErrorDetails } from './general';
import { userErrorDetails } from './user';
import { medicineErrorDetails } from './medicine';

const buildErrorDetail = (
  code: string,
  title: string,
  detail: string = null,
  source: ISourceError = null
): IErrorDetail => {
  let e: IErrorDetail = {
    code: code,
    title: title
  };
  if (detail) e.detail = detail;
  if (source && (source.parameter || source.pointer)) e.source = source;
  return e;
};

export { buildErrorDetail, generalErrorDetails, userErrorDetails, medicineErrorDetails };
