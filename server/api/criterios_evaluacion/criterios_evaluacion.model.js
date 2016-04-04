/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: David Biritica
email: deburitica7@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var CriteriosEvaluacion = sequelize.define('CriteriosEvaluacion', {
    idCriteriosEvaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_criterios_evaluacion'
    },
    nombre_criterios_evaluacion: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    idCompetencia:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_competencia',
      references:{
        model:'competencia',
        key:'id_competencia'
      }
    }
  },
    {
    tableName: 'criterios_evaluacion',
  },
  {
    classMethods: {
      associate: function(models){
        CriteriosEvaluacion.belongsToMany(models.CriteriosEvaluacion,
          {
              as: 'criteriosEvaluacion',
              through: models.EvidenciaHasCriteriosEvaluacion,
              foreignKey: 'id_criterios_evaluacion',
              otherKey: 'id_evidencia'
          });
       
      }
    }
  },
  {
      underscored: true
  });
  return CriteriosEvaluacion;
}
