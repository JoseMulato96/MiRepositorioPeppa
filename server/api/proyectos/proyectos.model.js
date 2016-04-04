/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: David Biritica
email: deburitica7@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var Proyectos = sequelize.define('Proyectos', {
        idProyecto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_proyecto'
        },
        nombreProyecto: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_proyecto'
        },
        codigoProyecto: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'codigo_proyecto'
        },
        justificacion_2_2: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        objetivoGeneral_2_3: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'objetivo_general_2_3'
        },
        objetivoEspecifico_2_4: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            field: 'objetivo_especifico_2_4'
        },
        palabrasClave_1_7: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'palabras_clave_1_7'
        },
        planteamiento_2_1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        impactoSocial_2_5_2_1: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'impacto_social_2_5_2_1'
        },
        restricciones_2_5_3: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        productosResultados_2_5_4: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'productos_resultados_2_5_4'
        },
        innovacion_2_6_1: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        innovacion_2_6_2: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        innovacion_2_6_3: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        innovacion_2_6_4: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        innovacion_2_6_5: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        valoracion_2_7_1: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        valoracion_2_7_2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        instructoresRequeridos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'instructores_requeridos'
        },
        aprendicesSugeridos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'aprendices_sugeridos'
        },
        descripcionAmbiente: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            field: 'descripcion_ambiente'
        },
        impactoAmbiental_2_5_2_3: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'impacto_ambiental_2_5_2_3'
        },
        impactoEconomico_2_5_2_2: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'impacto_economico_2_5_2_2'
        },
        impactoTecnologico_2_5_2_4: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'impacto_tecnologico_2_5_2_4'
        },
        beneficiario_2_5_1: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
        {
            tableName: 'proyecto'
        },
        {
            classMethods: {
                associate: function(models) {
                    Proyectos.hasMany(models.Actividades, { foreignKey: 'idProyecto' });

                    Proyectos.belongsToMany(models.Programas,
                        {
                            as: 'programas',
                            through: models.ProyectosHasProgramas,
                            foreignKey: 'idProyecto',
                            otherKey: ['codigo', 'version']
                        });
                    Proyectos.belongsToMany(models.Recursos,
                        {
                            as: 'recursos',
                            through: models.RecursoHasProyecto,
                            foreignKey: 'idProyecto',
                            otherKey: 'id_recurso'
                        });

                }
            }
        },
        {
            underscored: true
        });
    return Proyectos;
}
