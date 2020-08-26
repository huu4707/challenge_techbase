import { Model, DataTypes, Sequelize } from 'sequelize';

import sequelize from '../configs/db-connector';
class TokenModel extends Model {
  public id!: number;
  public token: string;
  public expires: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TokenModel.init(
  {
    id: {
      field: 'id',
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: {
      type: 'TIMESTAMP',
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
    tableName: 'tokens'
  }
);

export { TokenModel };
