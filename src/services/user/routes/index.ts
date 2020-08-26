import * as express from 'express';
import { UserRoutes } from './user-route';

class MainUserRoutes {
  public router: express.Router = express.Router();
  private userRoutes = new UserRoutes().router;
  constructor() {
    this.config();
  }
  private config(): void {
    this.router.use('/user', this.userRoutes);
  }
}

export const mainUserRoutes = new MainUserRoutes().router;
