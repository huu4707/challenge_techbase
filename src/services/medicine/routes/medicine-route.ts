import * as express from 'express';
import { MedicineController } from '../controllers/medicine-controller';
import { mustBeUser } from '../../../utils/middleware/user-middleware';
require('dotenv').config();

export class MedicineRoutes {
  public router: express.Router = express.Router();
  private medicineController = new MedicineController();
  constructor() {
    this.config();
  }
  private config(): void {
    this.router.get('/get', mustBeUser, this.medicineController.getMedicine);
    this.router.post('/create', mustBeUser, this.medicineController.createMedicine);
    this.router.put('/update', mustBeUser, this.medicineController.updateMedicine);
    this.router.delete('/delete', mustBeUser, this.medicineController.deleteMedicine);
  }
}
