/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    id_rol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_rol: {
      type: DataTypes.STRING('45'),
      allowNull: false
    },
    codigo_rol: {
      type: DataTypes.STRING('45'),
      allowNull: false,
      unique: {
        msg: 'El codigo ya existe'
      }
    }
  },
  {
    tableName: 'rol',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models){
        Roles.belongsToMany(models.Usuarios,
          {
            as: 'usuarios',
            through: models.RolesHasUsuarios,
            foreignKey: 'id_rol',
            otherKey: 'id_usuario'
          })
      }
    }
  });

  return Roles;
  }
