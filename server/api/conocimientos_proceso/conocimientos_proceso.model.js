/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var ConocimientosProceso = sequelize.define('ConocimientosProceso', {
        idConocimientoProceso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_conocimiento_proceso'
        },
        nombreConocimientoProceso: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_conocimiento_proceso'
        },
        estado: {
            type: DataTypes.BOOLEAN
        },
        idCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_competencia',
            references: {
                model: 'competencia',
                key: 'id_competencia'
            }
        }
    },
        {
            tableName: 'conocimiento_proceso'
        },
        {
            underscored: true
        });

    return ConocimientosProceso;
}
