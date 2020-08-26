import { Model, DataTypes, Sequelize } from 'sequelize';

import sequelize from '../configs/db-connector';
class UserModel extends Model {
  public id: number;
  public name: string;
  public email: string;
  public password!: string;
  public active: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

UserModel.init(
  {
    id: {
      field: 'id',
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    active: {
      type: DataTypes.BOOLEAN,
      field: 'active',
      defaultValue: 1, // default để khỏi làm chức năng active account
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      field: 'updated_at',
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'users',
    scopes: {
      safe: {
        attributes: {
          exclude: ['password']
        }
      }
    }
  }
);

export { UserModel };
