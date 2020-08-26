//declare sequelize ts connection
import { Sequelize } from 'sequelize';
import { logger } from '../../utils/logger';
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

try {
  sequelize
    .authenticate()
    .then(() => {
      logger.info({ label: 'Application', message: 'Database connect' });
    })
    .catch(() => {
      logger.error({ label: 'Application', message: 'Database cannot connect' });
    });
} catch (error) {
  logger.error({ label: 'Application', message: 'Database cannot connect.' });
}
export default sequelize;
