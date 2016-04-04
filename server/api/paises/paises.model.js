/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var Paises = sequelize.define('Paises', {
    id_paises: {
      type: DataTypes.STRING('4'),
      allowNull: false,
      primaryKey: true
    },
    nombre_pais: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
  {
    tableName: 'paises',
    timestamp: false
  },
  {
    classMethods: {
      associate: function(models){
        Paises.hasMany(models.Departamentos, {foreignKey: 'id_paises'})
      }
    }
  });

  return Paises;
}
