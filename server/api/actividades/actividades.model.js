/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var Actividades = sequelize.define('Actividades', {
        id_actividad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_actividad_proyecto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_proyecto: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'proyecto',
            key: 'id_proyecto'
          }
        },
        id_fase: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'fase',
            key: 'id_fase'
          }
        }

    },
        {
            tableName: "actividad"
        },
        {
            classMethods: {
                associate: function(models) {
                    Actividades.hasMany(models.GuiasAprendizaje, { foreignKey: 'id_actividad' });
                    Actividades.hasMany(models.ActividadesAprendizaje, { foreignKey: 'id_actividad' });
                }
            }
        }
    );
    return Actividades;
}
