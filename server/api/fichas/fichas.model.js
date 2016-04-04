/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Fichas = sequelize.define('Fichas', {
        idFicha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_ficha'
        },
        idCentroFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_centro_formacion',
            references: {
                model: 'centro_formacion',
                key: 'id_centro_formacion'
            }
        },
        idTipoOferta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tipo_oferta',
            references: {
                model: 'tipo_oferta',
                key: 'id_tipo_oferta'
            }
        },
        idJornada: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_jornada',
            references: {
                model: 'jornada',
                key: 'id_jornada'
            }
        },
        codigoFicha: {
            type: DataTypes.STRING('15'),
            allowNull: false,
            unique: true,
            field: 'codigo_ficha'
        },
        fechaInicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'fecha_inicio'
        },
        programaCodigo: {
            type: DataTypes.STRING('6'),
            allowNull: false,
            field: 'programa_codigo',
            references: {
                model: 'programa',
                key: 'codigo'
            }
        },
        programaVersion: {
            type: DataTypes.STRING('4'),
            allowNull: false,
            field: 'programa_version',
            references: {
                model: 'programa',
                key: 'version'
            }
        },
        idTipoFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_tipo_formacion',
            references: {
                model: 'tipo_formacion',
                key: 'id_tipo_formacion'
            }
        },
        idProyecto: {
            type: DataTypes.INTEGER,
            field: 'id_proyecto',
            references: {
                model: 'proyecto',
                key: 'id_proyecto'
            }
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        fecha_fin_lectiva: {
            type: DataTypes.DATEONLY
        },
        fecha_fin_practva: {
            type: DataTypes.DATEONLY
        }

    },
        {
            tableName: 'ficha'
        },
        {
            classMethods: {
                associate: function(models) {
                    Fichas.hasMany(models.InasistenciasAprendiz, { foreignKey: 'idFicha' });
                    Fichas.hasMany(models.NovedadesInstructor, { foreignKey: 'idFicha' });
                    Fichas.hasMany(models.SabanasHorarios, { foreignKey: 'idFicha' });

                }
            }
        },
        {
            underscored: true
        });

    return Fichas;
}
