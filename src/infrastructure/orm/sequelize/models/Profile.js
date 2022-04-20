import Model from '../SequelizeModel';

class Profile extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        profession: {
          type: DataTypes.STRING,
          allowNull: false
        },
        balance:{
          type:DataTypes.DECIMAL(12,2)
        },
        type: {
          type: DataTypes.ENUM('client', 'contractor')
        }
      },
      {
        tableName: 'profiles',
        ...this.Meta.baseConfig,
        sequelize,
        modelName: 'Profile'
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
    this.hasMany(models.Contract, { as: 'Client', foreignKey: 'ClientId' });
  }
};

export default Profile;
