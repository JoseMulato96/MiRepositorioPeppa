/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var TiposFormacion = sequelize.define('TiposFormacion', {
        idTipoFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_tipo_formacion'
        },
        tipoFormacion: {
            type: DataTypes.STRING(45),
            allowNull: null,
            field: 'tipo_formacion'

        }
    },
        {
            tableName: 'tipo_formacion',
        },
        {
            classMethods: {
                associate: function(models) {
                    TiposFormacion.hasMany(models.Fichas, { foreignKey: 'idTipoFormacion' });
                    TiposFormacion.hasMany(models.Programas, { foreignKey: 'idTipoFormacion' });
                }
            }
        },
        {

            underscored: true
        });
    return TiposFormacion;
}
