/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: David Biritica
email: deburitica7@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TecnicasDidacticas = sequelize.define('TecnicasDidacticas', {
    id_tecnica_didactica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_tecnica_didactica: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion_tecnica_didactica: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
    {
    tableName: 'tecnica_didactica',
    underscored: true

  }, {
    classMethods: {
      associate: function(models){
        TecnicasDidacticas.belongsToMany(models.Evidencias,
          {
              as: 'evidencias',
              through: models.EvidenciaHasTecnicaDidactica,
              foreignKey: 'id_tecnica_didactica',
              otherKey: 'id_evidencia'
          });

         TecnicasDidacticas.belongsToMany(models.ActividadesAprendizaje,
          {
              as: 'tecnicaDidactica',
              through: models.ActividadAprendizajeHasTecnicaDidactica,
              foreignKey: 'id_tecnica_didactica',
              otherKey: 'id_actividad_aprendizaje'
          });
      }
    }
  });
  return TecnicasDidacticas;
}
