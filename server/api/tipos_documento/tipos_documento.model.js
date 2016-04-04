/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposDocumento = sequelize.define('TiposDocumento', {
    id_tipo_documento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_documento: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_documento',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models) {
        TiposDocumento.hasMany(models.Usuarios, { foreignKey: 'id_tipo_documento'});
      }
    }
  });

  return TiposDocumento;
  }
