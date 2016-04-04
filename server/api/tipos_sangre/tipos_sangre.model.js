/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposSangre = sequelize.define('TiposSangre', {
    id_tipo_sangre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_sangre: {
      type: DataTypes.STRING('5'),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_sangre',
    underscored: true
  },
    {
      classMethods: {
        associate: function(models){
          TiposSangre.hasMany(models.Usuarios, {foreignKey: 'id_tipo_sangre'});
        }
      }
    });

    return TiposSangre;
  }
