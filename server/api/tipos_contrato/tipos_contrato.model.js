/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposContrato = sequelize.define('TiposContrato', {
    id_tipo_contrato: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_contrato: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_contrato',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models) {
        TiposContrato.hasMany(models.Usuarios, { foreignKey: 'id_tipo_contrato'});
      }
    }
  });

  return TiposContrato;
}
