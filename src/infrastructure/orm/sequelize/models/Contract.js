import Model from '../SequelizeModel';

class Contract extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        terms: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status:{
          type: DataTypes.ENUM('new','in_progress','terminated')
        }
      },
      {
        tableName: 'contracts',
        ...this.Meta.baseConfig,
        sequelize,
        modelName: 'Contract'
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Profile, { as: 'contractor' });
    this.belongsTo(models.Profile, { as: 'client' });
    this.hasMany(models.Job, { as: 'job' });
  }
};

export default Contract;
