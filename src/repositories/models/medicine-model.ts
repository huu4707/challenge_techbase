import { Model, DataTypes, Sequelize } from 'sequelize';

import sequelize from '../configs/db-connector';
class MedicineModel extends Model {
  public id: number;
  public name: string;
  public price: string;
  public active: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}

MedicineModel.init(
  {
    id: {
      field: 'id',
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    active: {
      type: DataTypes.BOOLEAN,
      field: 'active',
      defaultValue: 1,
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
    },
    deletedAt: {
      field: 'deleted_at',
      type: 'TIMESTAMP'
    }
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'medicine'
  }
);

export { MedicineModel };
