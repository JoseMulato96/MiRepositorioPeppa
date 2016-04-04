/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var Jornadas = sequelize.define('Jornadas', {
    id_jornada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_jornada: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
  {
    tableName: 'jornada',
    timestamp: false
  },
  {
    classMethods: {
      associate: function(models){
        Jornadas.hasMany(models.Fichas, {foreignKey: 'id_jornada'})
      }
    }
  });

  return Jornadas;
}
