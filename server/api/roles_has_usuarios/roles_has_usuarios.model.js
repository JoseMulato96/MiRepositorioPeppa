/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var RolesHasUsuarios = sequelize.define('RolesHasUsuarios', {
    id_rol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    }
  },
  {
    tableName: 'rol_has_usuario',
    underscored: true
  });

  return RolesHasUsuarios;
}
