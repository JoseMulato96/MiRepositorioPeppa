/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: David Biritica
email: deburitica7@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var Recursos = sequelize.define('Recursos', {
    id_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_unitario: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codigo_orions: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_tipo_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_recurso',
        key: 'id_tipo_recurso'
      }
    },

    id_fuente_recursos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fuente_recursos',
        key: 'id_fuente_recursos'
      }
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unidad_medida',
        key: 'id_unidad_medida'
      }
    },
    id_rubro_presupuestal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_rubro',
        key: 'id_tipo_rubro'
      }
    },
    id_competencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'competencia',
        key: 'id_competencia'
      }
    }
  },
    {
    tableName: 'recurso',
    underscored: true

  },
  {
    classMethods: {
      associate: function(models){
        Recursos.belongsToMany(models.ActividadesAprendizaje,
          {
              as: 'actividadAprendizaje',
              through: models.ActividadAprendizajeHasRecurso,
              foreignKey: 'id_recurso',
              otherKey: 'id_actividad_aprendizaje'
          });
        Recursos.belongsToMany(models.Proyectos,
          {
            as: 'proyecto',
            through: models.recurso_has_proyecto,
            foreignKey: 'id_recurso',
            otherKey: 'id_proyecto'
          });
      }
    }
  });
  return Recursos;
}
