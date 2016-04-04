/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Jose Mulato
email: jwmulato@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var SabanasHorariosHasResultadosAprendizajes = sequelize.define('SabanasHorariosHasResultadosAprendizajes', {
        idSabanaHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_sabana_horario',
            references: {
                model: 'sabana_horario',
                key: 'id_sabana_horario'
            }
        },
        idResultadoAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_resultado_aprendizaje',
            references: {
                model: 'resultado_aprendizaje',
                key: 'id_resultado_aprendizaje'
            }
        }
    },
        {
            tableName: "sabana_horario_has_resultado_aprendizaje"
        },
        {
            underscored: true
        });
    return SabanasHorariosHasResultadosAprendizajes;
}
