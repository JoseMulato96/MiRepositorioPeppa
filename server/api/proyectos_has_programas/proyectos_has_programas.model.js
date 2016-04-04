'use strict';

export default function(sequelize, DataTypes) {
    var ProyectosHasProgramas = sequelize.define('ProyectosHasProgramas', {

        idProyecto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            primaryKey: true,
            field: 'id_proyecto',
            references: {
                model: 'proyecto',
                key: 'id_proyecto'
            }
        },
        programaCodigo: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: false,
            primaryKey: true,
            field: 'programa_codigo',
            references: {
                model: 'programa',
                key: 'codigo'
            }
        },

        programaVersion: {
            type: DataTypes.STRING(4),
            allowNull: false,
            unique: false,
            primaryKey: true,
            field: 'programa_version',
            references: {
                model: 'programa',
                key: 'version'
            }
        },

    },
        {
            tableName: 'proyecto_has_programa'
        },
        {
            underscored: true
        });
    return ProyectosHasProgramas;
}
