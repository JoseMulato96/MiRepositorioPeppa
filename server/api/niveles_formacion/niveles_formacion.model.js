/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var NivelesFormacion = sequelize.define('NivelesFormacion', {
        idNivelFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_nivel_formacion'
        },
        nivelFormacion: {
            type: DataTypes.STRING(60),
            allowNull: false,
            field: 'nivel_formacion'
        },
    },
        {
            tableName: 'nivel_formacion'
        },
        {
            classMethods: {
                associate: function(models) {
                    NivelesFormacion.hasMany(models.Programas, { foreignKey: 'idNivelFormacion' });
                }
            }
        },
        {
            underscored: true
        });
    return NivelesFormacion;
}
