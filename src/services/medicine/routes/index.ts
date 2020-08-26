import * as express from 'express';
import { MedicineRoutes } from './medicine-route';

class MainMedicineRoutes {
  public router: express.Router = express.Router();
  private userRoutes = new MedicineRoutes().router;
  constructor() {
    this.config();
  }
  private config(): void {
    this.router.use('/medicine', this.userRoutes);
  }
}

export const mainMedicineRoutes = new MainMedicineRoutes().router;
