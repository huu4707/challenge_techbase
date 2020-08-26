//300 => 399
import { IErrorDetail } from '../responses';
import { buildErrorDetail } from './index';

const medicineErrorDetails = {
  E_3OO(detail: string = null): IErrorDetail {
    const e = buildErrorDetail('200', 'Medicine name already exists ', detail);
    return e;
  },
  E_3O1(detail: string = null): IErrorDetail {
    const e = buildErrorDetail('200', 'Medicine not found ', detail);
    return e;
  }
};

export { medicineErrorDetails };
