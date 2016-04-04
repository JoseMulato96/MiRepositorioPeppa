/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var TiposCompetencia = sequelize.define('TiposCompetencia', {
        idTipoCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_tipo_competencia'
        },
        tipoCompetencia: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'tipo_competencia'

        }
    },
        {
            tableName: 'tipo_competencia'
        },
        {
            classMethods: {
                associate: function(models) {
                    TiposCompetencia.hasMany(models.Competencias, { foreignKey: 'idTipoCompetencia' });
                }
            }
        },
        {
            underscored: true
        });
    return TiposCompetencia;
}
