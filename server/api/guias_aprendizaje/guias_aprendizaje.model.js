/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var GuiasAprendizaje= sequelize.define('GuiasAprendizaje', {
    id_guia_aprendizaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    introduccion: {
     type: DataTypes.TEXT,
     allowNull:false
    },
    glosario_terminos:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    referentes_bibliograficos:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    control_documento:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    id_actividad:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'actividad',
        key:'id_actividad'
      }
    }
  },
  {
    tableName:"guia_aprendizaje"
  }
  );
  return GuiasAprendizaje;
}
