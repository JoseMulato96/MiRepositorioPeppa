/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Jose Mulato
email: jwmulato@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var DetallesSabanasHorarios = sequelize.define('DetallesSabanasHorarios', {
        idDetalleSabanaHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_detalle_sabana_horario'
        },
        idSabanaHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,

            field: 'id_sabana_horario',
            references: {
                model: 'sabana_horario',
                key: 'id_sabana_horario'
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'hora_inicio'
        },
        horaFinal: {
            type: DataTypes.TIME,
            allowNull: false,
            field: 'hora_final'
        }
    },
        {
            tableName: "detalle_sabana_horario",
        },
        {
            underscored: true
        });
    return DetallesSabanasHorarios;
}
