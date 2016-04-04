/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposOferta = sequelize.define('TiposOferta', {
    id_tipo_oferta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tipo_oferta: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_oferta',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models){
        TiposOferta.hasMany(models.Fichas, {foreignKey: 'id_tipo_oferta'})
      }
    }
  });

  return TiposOferta;
}
