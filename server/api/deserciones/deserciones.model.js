/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Deserciones = sequelize.define('Deserciones', {
        idDesercion: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_desercion'
        },
        idEstado: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'id_estado',
            references: {
                model: 'estado',
                key: 'id_estado'
            }
        },
        observacion: DataTypes.TEXT,
        fecha: DataTypes.DATEONLY,
        motivo: DataTypes.TEXT
    },
        {
            tableName: 'desercion'
        },
        {
            classMethods: {
                associate: function(models) {
                    Deserciones.hasMany(models.Usuarios, { foreignKey: 'id_desercion' });
                }
            }
        },
        {
            underscored: true
        });

    return Deserciones;
}
