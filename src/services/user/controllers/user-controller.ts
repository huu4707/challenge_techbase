import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { UserModel, TokenModel, sequelize } from '../../../repositories/models';
import { validate } from '../../../utils/validator';
import { buildErrorMessage, buildSingleSuccessMessage } from '../../../utils/response-messages';
import { registerSchema, loginSchema } from '../configs/validate-schemas';
import { userErrorDetails, generalErrorDetails } from '../../../utils/response-messages/error-details';
import { createToken } from '../../../utils/jwt';
import { hash, compare } from 'bcryptjs';
import moment from 'moment';

require('dotenv').config();

export class UserController {
  constructor() {}

  /**
   * @swagger
   * definitions:
   *   register:
   *       required:
   *           - email
   *           - name
   *           - password
   *       properties:
   *           email:
   *               type: string
   *               uniqueItems: true
   *           name:
   *               type: string
   *           password:
   *               type: string
   */

  /**
   * @swagger
   * /user/register:
   *   post:
   *     tags:
   *       - User
   *     name: register
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       required: true
   *       schema:
   *         $ref: '#/definitions/register'
   *     responses:
   *       200:
   *         description: register success
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       500:
   *         description: Internal server errors
   */
  public register = async (req: Request, res: Response): Promise<Response> => {
    let transaction: any = null;
    try {
      let data = (({ name, email, password }) => ({
        name,
        email,
        password
      }))(req.body);
      const validateError = validate(data, registerSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      const existEmail = await UserModel.findOne({ where: { email: data.email } });
      if (existEmail) return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(userErrorDetails.E_2OO()));
      data.password = await hash(data.password, Number(process.env.BCRYPT_SALT));
      transaction = await sequelize.transaction();
      let result = await UserModel.create(data, { transaction });
      result = JSON.parse(JSON.stringify(result, null, 4));
      delete result.password;
      await transaction.commit();
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(result));
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  };

  /**
   * @swagger
   * definitions:
   *   login:
   *       required:
   *           - email
   *           - password
   *       properties:
   *           email:
   *               type: string
   *           password:
   *               type: string
   *
   */

  /**
   * @swagger
   * /user/login:
   *   post:
   *     tags:
   *       - User
   *     name: register
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       required: true
   *       schema:
   *         $ref: '#/definitions/login'
   *     responses:
   *       200:
   *         description: login success
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       500:
   *         description: Internal server errors
   */

  public async login(req: Request, res: Response): Promise<Response> {
    let transaction: any = null;
    try {
      let profile = (({ email, password }) => ({
        email,
        password
      }))(req.body);
      const validateError = validate(profile, loginSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      let user = await UserModel.findOne({ where: { email: profile.email } });
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send(buildErrorMessage(generalErrorDetails.E_004('Email not found')));
      }
      if (user && !user.active) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send(buildErrorMessage(generalErrorDetails.E_008('Account not activated')));
      }
      const match = await compare(profile.password, user.password);
      if (!match) {
        return res.status(HttpStatus.NOT_FOUND).send(buildErrorMessage(userErrorDetails.E_2O3()));
      }
      const token = await createToken({ id: user.id }, process.env.JWT_EXPIRED_TOKEN);
      const refreshToken = await createToken({ id: user.id }, process.env.JWT_EXPIRED_REFRESH_TOKEN);
      user = JSON.parse(JSON.stringify(user, null, 4));
      delete user.password;
      (user as any).token = token;
      (user as any).refreshToken = refreshToken;
      let dataToken = [
        {
          token: refreshToken,
          expires: moment()
            .add(7, 'days')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        {
          token,
          expires: moment()
            .add(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss')
        }
      ];
      transaction = await sequelize.transaction();
      await TokenModel.bulkCreate(dataToken, { transaction });
      await transaction.commit();
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(user));
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  }
}
