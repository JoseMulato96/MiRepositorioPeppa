'use strict';

export default function(sequelize, DataTypes) {
  var ActividadAprendizajeHasRecurso = sequelize.define('ActividadAprendizajeHasRecurso', {
    id_actividad_aprendizaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actividad_aprendizaje',
        key: 'id_actividad_aprendizaje'
      }
    },
    id_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recurso',
        key: 'id_recurso'
      }
    }
  },
    {
      tableName: 'actividad_aprendizaje_has_recurso',
      underscored: true
    });

    return ActividadAprendizajeHasRecurso;
}
