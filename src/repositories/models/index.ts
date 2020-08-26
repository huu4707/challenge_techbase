import sequelize from '../configs/db-connector';
import { UserModel } from './user-model';
import { TokenModel } from './token-model';

// sequelize.sync({ force: false }).then(async () => {
//   console.log('Database & tables created!');
// });

export { sequelize, UserModel, TokenModel };
