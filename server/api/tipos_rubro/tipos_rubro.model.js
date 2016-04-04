/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposRubro = sequelize.define('TiposRubro', {
    id_tipo_rubro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_rubro: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
    {
        tableName: 'tipo_rubro'
    },
    {
      classMethods: {
        associate: function(models){
          TiposRubro.hasMany(models.Recursos, {foreignKey: 'id_tipo_rubro'})
        }
      }
    });

    return TiposRubro;
}
