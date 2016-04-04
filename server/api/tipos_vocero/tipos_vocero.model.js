/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposVocero = sequelize.define('TiposVocero', {
    id_tipo_vocero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_vocero: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
    {
      tableName: 'tipo_vocero',
      underscored: true
  },
  {
    classMethods: {
      associate: function(models){
        TiposVocero.hasMany(models.Usuarios, {foreignKey: 'id_tipo_vocero'});
      }
    }
  });

    return TiposVocero;
}
