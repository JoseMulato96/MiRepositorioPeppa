/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var ActividadesAprendizaje = sequelize.define('ActividadesAprendizaje', {
        id_actividad_aprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_actividad_aprendizaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        duracion_actividad_aprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        id_tipo_actividad_aprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipo_actividad_aprendizaje',
                key: 'id_tipo_actividad_aprendizaje'
            }
        },
        id_actividad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'actividad',
                key: 'id_actividad'
            }
        }
    },
        {
            tableName: "actividad_aprendizaje"
        },
        {
            classMethods: {
                associate: function(models) {
                    ActividadesAprendizaje.belongsToMany(models.TecnicasDidacticas,
                        {
                            as: 'tecnicasDidacticas',
                            through: models.ActividadAprendizajeHasTecnicasDidacticas,
                            foreignKey: 'id_actividad_aprendizaje',
                            otherKey: 'id_tecnica_didactica'
                        });
                    ActividadesAprendizaje.belongsToMany(models.ResultadosAprendizaje,
                        {
                            as: 'resultadosAprendizaje',
                            through: models.ActividadesAprendizajeHasResultadosAprendizaje,
                            foreignKey: 'id_actividad_aprendizaje',
                            otherKey: 'id_resultado_aprendizaje'
                        });
                    ActividadesAprendizaje.belongsToMany(models.Usuarios,
                        {
                            as: 'usuario',
                            through: models.ActividadesAprendizajeHasUsuarios,
                            foreignKey: 'id_actividad_aprendizaje',
                            otherKey: 'id_usuario'
                        });
                    ActividadesAprendizaje.belongsToMany(models.Recursos,
                            {
                                as: 'recursos',
                                through: models.ActividadAprendizajeHasRecurso,
                                foreignKey: 'id_actividad_aprendizaje',
                                otherKey: 'id_recurso'
                        });
                }
            }
        },
        {
            underscored: true
        });

    return ActividadesAprendizaje;
}
