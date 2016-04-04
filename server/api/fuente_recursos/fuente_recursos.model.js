/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var FuenteRecursos = sequelize.define('FuenteRecursos', {
    id_fuente_recursos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_recursos: {
      type: DataTypes.STRING('60'),
      allowNull: false
    }
  },
    {
      tableName: 'fuente_recursos'
    },
    {
      classMethods: {
        associate: function(models){
          FuenteRecursos.hasMany(models.Recursos, {foreignKey: 'id_fuente_recursos'})
        }
      }
    });

    return FuenteRecursos;
}
