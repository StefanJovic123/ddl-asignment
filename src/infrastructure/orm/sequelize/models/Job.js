import Model from '../SequelizeModel';

class Job extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price:{
          type: DataTypes.DECIMAL(12,2),
          allowNull: false
        },
        paid: {
          type: DataTypes.BOOLEAN,
          default:false
        },
        paymentDate:{
          type: DataTypes.DATE
        }
      },
      {
        tableName: 'jobs',
        ...this.Meta.baseConfig,
        sequelize,
        modelName: 'Job'
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Contract, { as: 'contract' });
  }
};

export default Job;

