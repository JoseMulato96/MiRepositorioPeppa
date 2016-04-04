/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TecnicasEvaluacion = sequelize.define('TecnicasEvaluacion', {
    id_tecnica_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tecnica_evaluacion:{
      type: DataTypes.STRING(60),
      allowNull: false
    }
  },{
    tableName: 'tecnica_evaluacion',
    underscored: true
  },{
    classMethods:{
        associate:function(models){
          TecnicasEvaluacion.hasMany(models.Evidencias,{foreignKey:'id_tecnica_evaluacion'});
          TecnicasEvaluacion.hasMany(models.InstrumentosEvaluacion,{foreignKey:'id_tecnica_evaluacion'});
          TecnicasEvaluacion.belongsToMany(models.TiposEvidencias,
          {
              as: 'tecnicaEvaluacion',
              through: models.TiposEvidenciasHasTecnicasEvaluacion,
              foreignKey: 'id_tecnica_evaluacion',
              otherKey: 'id_tipo_evidencia'
          });
        }
    }
  });

  return TecnicasEvaluacion;
}
