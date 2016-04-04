/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var Competencias = sequelize.define('Competencias', {
        idCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_competencia'
        },
        nombreCompetencia: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_competencia'
        },
        estado: {
            type: DataTypes.BOOLEAN
        },
        codigo: {
            type: DataTypes.STRING(9),
            allowNull: false
        },
        duracionEstimadaHoras: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'duracion_estimada_horas'
        },
        idTipoCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_tipo_competencia',
            references: {
                model: 'tipo_competencia',
                key: 'id_tipo_competencia'
            }
        }

    }, {
            tableName: 'competencia'
        },
        {
            classMethods: {
                associate: function(models) {
                    Competencias.hasMany(models.ResultadosAprendizaje, { foreignKey: 'idCompetencia' });
                    Competencias.hasMany(models.CriteriosEvaluacion, { foreignKey: 'id_competencia' });
                    Competencias.hasMany(models.ConocimientosConceptosPrincipios, { foreignKey: 'idCompetencia' });
                    Competencias.hasMany(models.ConocimientosProceso, { foreignKey: 'idCompetencia' });
                    Competencias.belongsToMany(models.Programas,
                        {
                            as: 'programas',
                            through: models.ProgramasHasCompetencias,
                            foreignKey: 'idCompetencia',
                            otherKey: ['codigo', 'version']
                        })
                }
            }
        },
        {
            underscored: true
        });
    return Competencias;
}
