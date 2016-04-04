/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var EvidenciaHasCriteriosEvaluacion = sequelize.define('EvidenciaHasCriteriosEvaluacion', {
        idEvidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_evidencia',
            references: {
                model: 'evidencia',
                key: 'id_evidencia'
            }
        },
        idCriteriosEvaluacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_criterios_evaluacion',
            references: {
                model: 'criterios_evaluacion',
                key: 'id_criterios_evaluacion'
            }
        }

    },
        {
            tableName: "evidencia_has_criterios_evaluacion",
        },
        {
            underscored: true
        });
    return EvidenciaHasCriteriosEvaluacion;
}
