/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TiposEvidenciasHasTecnicasEvaluacion =  sequelize.define('TiposEvidenciasHasTecnicasEvaluacion', {
    id_tipo_evidencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_evidencia',
        key: 'id_tipo_evidencia'
      }
    },
    id_tecnica_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tecnica_evaluacion',
        key: 'id_tecnica_evaluacion'
      }
    }
    
  },
  {
    tableName:"tipo_evidencia_has_tecnica_evaluacion"
  },
  {
    underscored: true
  });
  return TiposEvidenciasHasTecnicasEvaluacion;
}
