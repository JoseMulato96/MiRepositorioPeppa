/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';
export default function(sequelize, DataTypes) {
  var InstrumentosEvaluacion = sequelize.define('InstrumentosEvaluacion', {
    id_instrumento_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_instrumento_evaluacion:{
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_tecnica_evaluacion:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'tecnica_evaluacion',
        key: 'id_tecnica_evaluacion'
      }
    }
  },{
    tableName: 'instrumento_evaluacion'
  });
  return InstrumentosEvaluacion;
}
