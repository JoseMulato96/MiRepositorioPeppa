/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var NovedadesInstructor = sequelize.define('NovedadesInstructor', {
    id_novedad_instructor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_instructor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    id_coordinador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references :{
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    id_resultado_aprendizaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references :{
        model: 'resultado_aprendizaje',
        key: 'id_resultado_aprendizaje'
      }
    },
    id_ambiente_formacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ambiente_formacion',
        key: 'id_ambiente_formacion'
      }
    },
    id_ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ficha',
        key: 'id_ficha'
      }
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    novedad: DataTypes.STRING('255'),
    hora_inicio: DataTypes.TIME,
    hora_final: DataTypes.TIME,
    accion_corregir: DataTypes.STRING('255'),
    leido: DataTypes.BOOLEAN,
    fecha_novedad: DataTypes.DATEONLY
  },
    {
      tableName: 'novedades_instructores'
    });

    return NovedadesInstructor;
}
