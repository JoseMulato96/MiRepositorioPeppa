/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var UsuariosHasAreas = sequelize.define('UsuariosHasAreas', {
    id_area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'area',
        key: 'id_area'
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
    tableName: 'usuario_has_area',
    underscored: true
  });

  return UsuariosHasAreas;
}
