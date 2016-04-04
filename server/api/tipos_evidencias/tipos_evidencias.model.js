/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TiposEvidencias = sequelize.define('TiposEvidencias', {
    id_tipo_evidencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_evidencia:{
      type:DataTypes.STRING(45),
      allowNull:false
    }

  },
  {
    tableName:"tipo_evidencia",
    underscored: true
  },
  {
      classMethods:{
        associate:function(models){
          TiposEvidencias.hasMany(models.Evidencias,{foreignKey:'id_tipo_evidencia'});
          TiposEvidencias.belongsToMany(models.TecnicasEvaluacion,
          {
              as: 'tecnicasEvaluacion',
              through: models.TiposEvidenciasHasTecnicasEvaluacion,
              foreignKey: 'id_tipo_evidencia',
              otherKey: 'id_tecnica_evaluacion'
          });
        }
      }
    });

  return TiposEvidencias;
}
