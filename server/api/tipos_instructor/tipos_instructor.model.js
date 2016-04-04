/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var TiposInstructor = sequelize.define('TiposInstructor', {
    id_tipo_instructor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_instructor: {
      type: DataTypes.STRING('60'),
      allowNull: false
    }
  },
  {
    tableName: 'tipo_instructor',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models) {
        TiposInstructor.hasMany(models.UsuariosHasFichas, {foreignKey: 'id_tipo_instructor'})
      }
    }
  });

  return TiposInstructor;
}
