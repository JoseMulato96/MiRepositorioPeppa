/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var ResultadosAprendizaje = sequelize.define('ResultadosAprendizaje', {
    id_resultado_aprendizaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_competencia:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'competencia',
        key: 'id_competencia'
      }
    },
    nombre_resultado_aprendizaje:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'resultado_aprendizaje',
    underscored: true
  },
  {
      classMethods:{
        associate:function(models){
          ResultadosAprendizaje.belongsToMany(models.ActividadesAprendizaje,
          {
              as: 'ActividadesAprendizaje',
              through: models.ActividadesAprendizajeHasResultadosAprendizaje,
              foreignKey: 'id_resultado_aprendizaje',
              otherKey: 'id_actividad_aprendizaje'
          });
          ResultadosAprendizaje.belongsToMany(models.SabanasHorarios,
          {
              as: 'sabanasHorarios',
              through: models.SabanasHorariosHasResultadosAprendizajes,
              foreignKey: 'id_resultado_aprendizaje',
              otherKey: 'id_sabana_horario'
          });
        }
      }
    });

  return ResultadosAprendizaje;
}
