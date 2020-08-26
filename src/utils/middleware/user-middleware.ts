import { Request, NextFunction, Response } from 'express';
import { buildErrorMessage } from '../response-messages';
import { verifyLogInToken } from '../jwt';
import { UserModel, TokenModel } from '../../repositories/models';
import HttpStatus from 'http-status-codes';
import { generalErrorDetails } from '../response-messages/error-details';
require('dotenv').config();

export async function mustBeUser(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.headers['authorization'] as string;
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).send(buildErrorMessage(generalErrorDetails.E_003('Missing token')));
    } else {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
        const findToken = await TokenModel.findOne({ where: { token } });
        if (!findToken) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .send(buildErrorMessage(generalErrorDetails.E_003('Missing token')));
        }
        const { id } = await verifyLogInToken(token, process.env.JWT_EXPIRED_TOKEN);
        const user = await UserModel.findOne({ where: { id } });
        if (!user) {
          return res.status(HttpStatus.NOT_FOUND).send(buildErrorMessage(generalErrorDetails.E_006('User not found')));
        }
        if (user && !user.active) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .send(buildErrorMessage(generalErrorDetails.E_007('Account not activated')));
        }
        req.query.idUser = id;
        next();
      } else {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(generalErrorDetails.E_005('token invalid')));
      }
    }
  } catch (error) {
    if (error && error.type === 'TOKEN_EXPIRED') {
      return res.status(HttpStatus.UNAUTHORIZED).send(buildErrorMessage(generalErrorDetails.E_003('Missing token')));
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
  }
}
