/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var AmbientesFormacion = sequelize.define('AmbientesFormacion', {
    id_ambiente_formacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_ambiente_formacion: {
      type: DataTypes.STRING('60'),
      allowNull: false
    },
    denominacion_ambiente_formacion:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoria_ambiente_id_categoria_ambiente:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references :{
        model: 'categoria_ambiente',
        key: 'id_categoria_ambiente'
      }
    },
    id_tipo_ambiente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_ambiente',
        key: 'id_tipo_ambiente'
      }
    }
  },
    {
      tableName: 'ambiente_formacion',
      underscored: true
    },
    {
      classMethods: {
        associate: function(models){
          AmbientesFormacion.hasMany(models.NovedadesInstructor, {foreignKey: 'id_ambiente_formacion'});
          AmbientesFormacion.hasMany(models.SabanasHorarios, {foreignKey: 'id_ambiente_formacion'});
        }
      }
    });

    return AmbientesFormacion;
}
