/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Programas = sequelize.define('Programas', {

        codigo: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        version: {
            type: DataTypes.STRING(4),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        nombrePrograma: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_programa'
        },
        duracionTrimestresLectiva: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'duracion_trimestres_lectiva'
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        justificacion: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        idModalidadFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_modalidad_formacion',
            references: {
                model: 'modalidad_formacion',
                key: 'id_modalidad_formacion'
            }
        },
        idNivelFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_nivel_formacion',
            references: {
                model: 'nivel_formacion',
                key: 'id_nivel_formacion'
            }
        },
        idTipoFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_tipo_formacion',
            references: {
                model: 'tipo_formacion',
                key: 'id_tipo_formacion'
            }
        },
        duracionTrimestresProducto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'duracion_trimestres_producto'
        },
        idRedTecnologica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_red_tecnologica',
            references: {
                model: 'red_tecnologica',
                key: 'id_red_tecnologica'
            }
        }


    },
        {
            tableName: 'programa'
        },
        {
            classMethods: {
                associate: function(models) {
                    Programas.hasMany(models.Fichas, { foreignKey: ['codigo', 'version'] });

                    Programas.belongsToMany(models.Competencias,
                        {
                            as: 'competencias',
                            through: models.ProgramasHasCompetencias,
                            foreignKey: ['codigo', 'version'],
                            otherKey: 'id_competencia'
                        });

                    Programas.belongsToMany(models.Proyectos,
                        {
                            as: 'proyectos',
                            through: models.ProyectosHasProgramas,
                            foreignKey: ['codigo', 'version'],
                            otherKey: 'id_proyecto'
                        });
                }
            }
        },
        {
            underscored: true
        });
    return Programas;
}
