/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Steven Bolivar
email: sbolivar73@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var InasistenciasAprendiz = sequelize.define('InasistenciasAprendiz', {
        id_inasistencias: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        id_aprendiz: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'usuario',
                key: 'id_usuario'
            }
        },
        id_instructor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'usuario',
                key: 'id_usuario'
            }
        },
        id_ficha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ficha',
                key: 'id_ficha'
            }
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        asistio: DataTypes.BOOLEAN

    },
        {
            tableName: 'inasistencias_aprendiz',
            underscored: true
        });

    return InasistenciasAprendiz;
}
