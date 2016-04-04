/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var UnidadesMedida = sequelize.define('UnidadesMedida', {
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_unidad: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
    {
      tableName: 'unidad_medida'
    },
    {
      classMethods: {
        associate: function(models){
          UnidadesMedida.hasMany(models.Recursos, {foreignKey: 'id_unidad_medida'})
        }
      }
    });

    return UnidadesMedida;
}
