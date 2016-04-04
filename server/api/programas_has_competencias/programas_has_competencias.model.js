'use strict';

export default function(sequelize, DataTypes) {
    var ProgramasHasCompetencias = sequelize.define('ProgramasHasCompetencias', {
        programaCodigo: {
            type: DataTypes.STRING(6),
            allowNull: false,
            primaryKey: true,
            unique: false,
            field: 'programa_codigo',
            references: {
                model: 'programa',
                key: 'codigo'
            }
        },
        programaVersion: {
            type: DataTypes.STRING(4),
            allowNull: false,
            primaryKey: true,
            unique: false,
            field: 'programa_version',
            references: {
                model: 'programa',
                key: 'version'
            }
        },
        idCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: false,
            field: 'id_competencia',
            references: {
                model: 'competencia',
                key: 'id_competencia'
            }
        }

    },
        {
            tableName: 'programa_has_competencia',
        },
        {
            underscored: true
        });
    return ProgramasHasCompetencias;
}
