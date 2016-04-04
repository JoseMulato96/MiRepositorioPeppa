/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var Regionales = sequelize.define('Regionales', {
    id_regional: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_regional: {
      type: DataTypes.STRING('60'),
      allowNull: false
    },
    codigo_regional: {
      type: DataTypes.STRING('10'),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'regional'
  },
  {
    classMethods: {
      associate: function(models){
        Regionales.hasMany(models.CentrosFormacion, {foreignKey: 'id_regional'})
      }
    }
  });

  return Regionales;
}
