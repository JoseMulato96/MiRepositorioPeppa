/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Estados = sequelize.define('Estados', {
        idEstado: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_estado'
        },
        estado: {
            type: DataTypes.STRING('45'),
            allowNull: false
        }
    },
        {
            tableName: 'estado'
        },
        {
            classMethods: {
                associate: function(models) {
                    Estados.hasMany(models.Deserciones, { foreignKey: 'id_estado' });
                }
            }
        },
        {
            underscored: true
        });

    return Estados;
}
