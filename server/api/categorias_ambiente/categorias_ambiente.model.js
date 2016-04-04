/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var CategoriasAmbiente = sequelize.define('CategoriasAmbiente', {
    id_categoria_ambiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_categoria_ambiente: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
    {
      tableName: 'categoria_ambiente',
      underscored: true
    },

    {
      classMethods: {
        associate: function(models){
          CategoriasAmbiente.hasMany(models.AmbientesFormacion, {foreignKey: 'id_categoria_ambiente'});
        }
      }
    });

    return CategoriasAmbiente;
}
