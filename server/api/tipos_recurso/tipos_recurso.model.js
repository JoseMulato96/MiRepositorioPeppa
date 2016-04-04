/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposRecurso = sequelize.define('TiposRecurso', {
    id_tipo_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_recurso: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
    {
      tableName: 'tipo_recurso'
    },
    {
      classMethods: {
        associate: function(models){
          TiposRecurso.hasMany(models.Recursos, {foreignKey: 'id_tipo_recurso'})
        }
      }
    });

    return TiposRecurso;
}
