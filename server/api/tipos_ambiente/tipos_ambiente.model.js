/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposAmbiente = sequelize.define('TiposAmbiente', {
    id_tipo_ambiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_ambiente: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
      {
        tableName: 'tipo_ambiente',
        underscored: true
      },
      {
        classMethods: {
          associate: function(models){
            TiposAmbiente.hasMany(models.AmbientesFormacion, {foreignKey: 'id_tipo_ambiente'});
          }
        }
      });

      return TiposAmbiente;
}
