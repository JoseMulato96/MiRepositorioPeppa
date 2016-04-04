/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var UsuariosHasFichas = sequelize.define('UsuariosHasFichas', {
    id_usuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      unique: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    id_ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: false,
      references: {
        model: 'ficha',
        key: 'id_ficha'
      }
    },
    id_tipo_instructor: {
      type: DataTypes.INTEGER(11),
      references: {
        model: 'tipo_instructor',
        key: 'id_tipo_instructor'
      }
    }
  },
  {
    tableName: 'usuario_has_ficha'
  },
  {
      underscored: true
  });

  return UsuariosHasFichas;
}
