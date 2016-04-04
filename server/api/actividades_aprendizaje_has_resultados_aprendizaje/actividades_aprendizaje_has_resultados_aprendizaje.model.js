/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var ActividadesAprendizajeHasResultadosAprendizaje = sequelize.define('ActividadesAprendizajeHasResultadosAprendizaje', {
        idActividadAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_actividad_aprendizaje',
            references: {
                model: 'actividad_aprendizaje',
                key: 'id_actividad_aprendizaje'
            }
        },
        idResultadoAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_resultado_aprendizaje',
            references: {
                model: 'resultado_aprendizaje',
                key: 'id_resultado_aprendizaje'
            }
        }

    },
        {
            tableName: "actividad_aprendizaje_has_resultado_aprendizaje"
        },
        {
            underscored: true
        });
    return ActividadesAprendizajeHasResultadosAprendizaje;
}
