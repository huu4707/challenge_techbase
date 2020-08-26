import { IErrorDetail, ISourceError } from '../responses';
import { buildErrorDetail } from './index';
import { buildingEnv } from '../../consts';
import { logger } from '../../logger';

const generalErrorDetails = {
  /** Internal server error, detail should be null if you cannot detect error */
  E_OO1(error: any = null, detail: string = null): IErrorDetail {
    if (error && buildingEnv.includes(process.env.NODE_ENV)) {
      logger.error({ label: 'Error 500', message: error.message });
    }
    const e = buildErrorDetail('001', 'Internal server error', detail);
    return e;
  },

  /**
   * Missing token
   *
   * @param {string} [detail='Missing token']
   * @param {ISourceError} [source=null]
   * @returns {IErrorDetail}
   */
  E_003(detail: string = 'Missing token', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('003', 'Unauthenticated', detail, source);
  },

  E_004(detail: string = 'Email not found', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('004', 'Email not found', detail, source);
  },

  E_005(detail: string = 'token invalid', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('005', 'Token invalid', detail, source);
  },

  E_006(detail: string = 'User not found', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('006', 'User not found', detail, source);
  },
  E_007(detail: string = 'Account not activated', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('008', 'Account not activated', detail, source);
  },
  E_008(detail: string = 'Permission denied', source: ISourceError = null): IErrorDetail {
    return buildErrorDetail('009', 'Permission denied', detail, source);
  }
};

export { generalErrorDetails };
