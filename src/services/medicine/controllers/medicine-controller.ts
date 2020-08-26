import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { MedicineModel, sequelize } from '../../../repositories/models';
import { validate } from '../../../utils/validator';
import { buildErrorMessage, buildSingleSuccessMessage } from '../../../utils/response-messages';
import { createSchema, updateSchema, medicineIdSchema } from '../configs/validate-schemas';
import { medicineErrorDetails, generalErrorDetails } from '../../../utils/response-messages/error-details';
import { EActivation } from '../../../utils/consts';
const { Op } = require('sequelize');
import moment from 'moment';

require('dotenv').config();

export class MedicineController {
  constructor() {}

  /**
   * @swagger
   * /medicine/get:
   *   get:
   *     tags:
   *       - Medicine
   *     security:
   *       - Bearer: []
   *     name: getMedicine
   *     parameters:
   *     - in: query
   *       name: medicineId
   *       schema:
   *          type: number
   *     responses:
   *       200:
   *         description: success
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       500:
   *         description: Internal server errors
   */
  public getMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
      const medicineId = req.query.medicineId;
      const validateError = validate(medicineId, medicineIdSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      const medicine = await MedicineModel.findOne({ where: { id: medicineId, active: EActivation['YES'] } });
      if (!medicine) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(buildErrorMessage(medicineErrorDetails.E_3O1('Medicine not found')));
      }
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(medicine));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  };

  /**
   * @swagger
   * definitions:
   *   createMedicine:
   *       required:
   *           - name
   *           - price
   *       properties:
   *           name:
   *               type: string
   *           price:
   *               type: number
   */

  /**
   * @swagger
   * /medicine/create:
   *   post:
   *     tags:
   *       - Medicine
   *     security:
   *       - Bearer: []
   *     name: create
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       required: true
   *       schema:
   *         $ref: '#/definitions/createMedicine'
   *     responses:
   *       200:
   *         description: successful
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal server errors
   */
  public async createMedicine(req: Request, res: Response): Promise<Response> {
    let transaction: any = null;
    try {
      // const idUser = req.query.idUser;
      const dataInput = (({ name, price }) => ({
        name,
        price
      }))(req.body);
      const validateError = validate(dataInput, createSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      transaction = await sequelize.transaction();
      const medicine = await MedicineModel.findOne({ where: { name: dataInput.name, active: EActivation['YES'] } });
      if (medicine) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send(buildErrorMessage(medicineErrorDetails.E_3OO('Medicine name already exists ')));
      }
      const result = await MedicineModel.create(dataInput, { transaction });
      await transaction.commit();
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(result));
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  }

  /**
   * @swagger
   * definitions:
   *   updateMedicine:
   *       required:
   *           - id
   *           - name
   *           - price
   *       properties:
   *           id:
   *               type: number
   *           name:
   *               type: string
   *           price:
   *               type: number
   */

  /**
   * @swagger
   * /medicine/update:
   *   put:
   *     tags:
   *       - Medicine
   *     security:
   *       - Bearer: []
   *     name: update
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       required: true
   *       schema:
   *         $ref: '#/definitions/updateMedicine'
   *     responses:
   *       200:
   *         description: successful
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       404:
   *         description: Data not found
   *       500:
   *         description: Internal server errors
   */
  public async updateMedicine(req: Request, res: Response): Promise<Response> {
    let transaction: any = null;
    try {
      // const idUser = req.query.idUser;
      const dataInput = (({ id, name, price }) => ({
        id,
        name,
        price
      }))(req.body);
      const validateError = validate(dataInput, updateSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      transaction = await sequelize.transaction();
      const medicine = await MedicineModel.findOne({ where: { id: dataInput.id, active: EActivation['YES'] } });
      if (!medicine) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(buildErrorMessage(medicineErrorDetails.E_3O1('Medicine not found')));
      }
      const checkName = await MedicineModel.findOne({
        where: { id: { [Op.ne]: dataInput.id }, name: dataInput.name, active: EActivation['YES'] }
      });
      if (checkName) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(buildErrorMessage(medicineErrorDetails.E_3OO('Medicine name already exists ')));
      }
      const result = await MedicineModel.update(
        { name: dataInput.name, price: dataInput.price },
        { where: { id: dataInput.id }, transaction }
      );
      await transaction.commit();
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(result));
    } catch (error) {
      if (transaction) await transaction.rollback();
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  }

  /**
   * @swagger
   * /medicine/delete:
   *   delete:
   *     tags:
   *       - Medicine
   *     security:
   *       - Bearer: []
   *     name: deleteMedicine
   *     parameters:
   *     - in: query
   *       name: medicineId
   *       schema:
   *          type: number
   *     responses:
   *       200:
   *         description: success
   *       400:
   *         description: Bad request - input invalid format, header is invalid
   *       500:
   *         description: Internal server errors
   */
  public deleteMedicine = async (req: Request, res: Response): Promise<Response> => {
    try {
      const medicineId = req.query.medicineId;
      const validateError = validate(medicineId, medicineIdSchema);
      if (validateError) {
        return res.status(HttpStatus.BAD_REQUEST).send(buildErrorMessage(validateError));
      }
      const medicine = await MedicineModel.update(
        { active: EActivation['NO'], deletedAt: moment().format('YYYY-MM-DD HH:mm:ss') },
        { where: { id: medicineId } }
      );
      if (!medicine) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send(buildErrorMessage(medicineErrorDetails.E_3O1('Medicine not found')));
      }
      return res.status(HttpStatus.OK).send(buildSingleSuccessMessage(medicine));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(buildErrorMessage(generalErrorDetails.E_OO1(error)));
    }
  };
}
