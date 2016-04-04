/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var Evidencias = sequelize.define('Evidencias', {
        idEvidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_evidencia'
        },
        nombreEvidencia: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_evidencia'
        },
        idActividadAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_actividad_aprendizaje',
            references: {
                model: 'actividad_aprendizaje',
                key: 'id_actividad_aprendizaje'
            }
        },
        descripcionEvidencia: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'descripcion_evidencia'
        },
        observacionEvidencia: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'observacion_evidencia'
        },
        idTipoEntrega: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tipo_entrega',
            references: {
                model: 'tipo_entrega',
                key: 'id_tipo_entrega'
            }
        },
        idTipoEvidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tipo_evidencia',
            references: {
                model: 'tipo_evidencia',
                key: 'id_tipo_evidencia'
            }
        },
        idTecnicaEvaluacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tecnica_evaluacion',
            references: {
                model: 'tecnica_evaluacion',
                key: 'id_tecnica_evaluacion'
            }
        }

    },
        {
            tableName: 'evidencia'
        },
        {
            classMethods: {
                associate: function(models) {
                    Evidencias.belongsToMany(models.TecnicasDidacticas,
                        {
                            as: 'tecnicasDidacticas',
                            through: models.EvidenciaHasTecnicaDidactica,
                            foreignKey: 'id_evidencia',
                            otherKey: 'id_tecnica_didactica'
                        });
                    Evidencias.belongsToMany(models.CriteriosEvaluacion,
                        {
                            as: 'criteriosEvaluacion',
                            through: models.EvidenciaHasCriteriosEvaluacion,
                            foreignKey: 'id_evidencia',
                            otherKey: 'id_criterios_evaluacion'
                        });

                }
            }
        },
        {
            underscored: true
        });
    return Evidencias;
}
