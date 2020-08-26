import * as express from 'express';
import { UserController } from '../controllers/user-controller';
require('dotenv').config();

export class UserRoutes {
  public router: express.Router = express.Router();
  private userController = new UserController();
  constructor() {
    this.config();
  }
  private config(): void {
    this.router.post('/register', this.userController.register);
    this.router.post('/login', this.userController.login);
  }
}
