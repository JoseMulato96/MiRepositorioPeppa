/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var RecursoHasProyecto = sequelize.define('RecursoHasProyecto', {
    id_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recurso',
        key: 'id_recurso'
      }
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'proyecto',
        key: 'id_proyecto'
      }
    }
  },
    {
      tableName: 'recurso_has_proyecto',
      timestamps: false
    },
    {
      underscored: true
  });
  return RecursoHasProyecto;
}
