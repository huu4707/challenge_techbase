//200 => 299
import { IErrorDetail } from '../responses';
import { buildErrorDetail } from './index';

const userErrorDetails = {
  E_2OO(detail: string = null): IErrorDetail {
    const e = buildErrorDetail('200', 'Email already exists ', detail);
    return e;
  },

  E_2O2(detail: string = null): IErrorDetail {
    const e = buildErrorDetail('202', 'Email not exists ', detail);
    return e;
  },
  E_2O3(detail: string = null): IErrorDetail {
    const e = buildErrorDetail('203', 'Password invalid', detail);
    return e;
  }
};

export { userErrorDetails };
