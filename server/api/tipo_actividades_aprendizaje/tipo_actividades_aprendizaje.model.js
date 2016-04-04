/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TipoActividadesAprendizaje= sequelize.define('TipoActividadesAprendizaje', {
   id_tipo_actividad_aprendizaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tipo_actividad_aprendizaje:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  },
  {
      tableName:"tipo_actividad_aprendizaje",
      underscored: true
    },
    {
      classMethods:{
        associate:function(models){
          TipoActividadesAprendizaje.hasMany(models.ActividadesAprendizaje,{foreignKey:'id_tipo_actividad_aprendizaje'});
        }
      }
    }
    );
  return TipoActividadesAprendizaje;
}
