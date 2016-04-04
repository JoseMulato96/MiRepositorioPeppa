'use strict';

export default function(sequelize, DataTypes) {
    var ActividadesAprendizajeHasUsuarios = sequelize.define('ActividadesAprendizajeHasUsuarios', {
        idActividadAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_actividad_aprendizaje',
            references: {
                model: 'actividad_aprendizaje',
                key: 'id_actividad_aprendizaje'
            }
        },
        idUsuario: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            field: 'id_usuario',
            references: {
                model: 'usuario',
                key: 'id_usuario'
            }
        }
    },
        {
            tableName: 'actividad_aprendizaje_has_usuario',
        },
        {
            underscored: true
        });

    return ActividadesAprendizajeHasUsuarios;
}
