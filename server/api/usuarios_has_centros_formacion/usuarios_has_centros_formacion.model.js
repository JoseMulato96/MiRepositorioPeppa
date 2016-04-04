/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var UsuariosHasCentrosFormacion = sequelize.define('UsuariosHasCentrosFormacion', {
    id_usuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    id_centro_formacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'centro_formacion',
        key: 'id_centro_formacion'
      }
    }
  },
  {
    tableName: 'usuario_has_centro_formacion',
    underscored: true
  });

  return UsuariosHasCentrosFormacion;
}
