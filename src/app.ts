import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { mainUserRoutes } from './services/user/routes';
import { logger } from './utils/logger';
require('dotenv').config();

const VERSION = process.env.VERSION || 'v1';
const HOST = process.env.SERVER_HOST + ':' + process.env.SERVER_PORT;
const swaggerDefinition = {
  info: {
    title: 'API Documentation',
    version: `version: ${VERSION}`,
    description: 'Endpoints to test the user registration routes'
  },
  host: HOST,
  basePath: `/api/${VERSION}`,
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'authorization',
      in: 'headers'
    }
  }
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ['**/*.ts']
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default class BootStrapService {
  public app: express.Application;
  private rootDocsPreFix = `/docs/${VERSION}`;
  private rootAPIPreFix = `/api/${VERSION}`;
  constructor() {
    this.app = express();
    this.config();
  }

  private async config(): Promise<void> {
    this.app.set('port', process.env.SERVER_PORT);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      req.headers['x-base-url'] = req.protocol + '://' + req.get('host');
      next();
    });
    // let whitelist = ['http://localhost:3000', 'http://example2.com'];
    const corsOptionsDelegate = (req: express.Request, callback: any) => {
      let corsOptions;
      // if (whitelist.indexOf(req.header('Origin')) !== -1) {
      if (true) {
        corsOptions = { origin: true };
      } else {
        corsOptions = { origin: false };
      }
      callback(null, corsOptions);
    };
    this.app.use(cors(corsOptionsDelegate));
    this.app.use(this.rootDocsPreFix, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info({ label: 'Swagger', message: `Link docs swagger ${'http://' + HOST + this.rootDocsPreFix}` });
    this.app.use(this.rootAPIPreFix, mainUserRoutes);
  }
}
