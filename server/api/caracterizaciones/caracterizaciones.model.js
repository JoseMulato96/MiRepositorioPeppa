'use strict';

export default function(sequelize, DataTypes) {
    var Caracterizaciones = sequelize.define('Caracterizaciones', {
        id_caracterizacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        acudiente: {
            type: DataTypes.STRING('80'),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING('15'),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING('45'),
            allowNull: false
        },

        sistema_liderazgo: DataTypes.STRING('80'),
        apoyo_bienestar:DataTypes.TEXT,
      },
        {
            tableName: 'caracterizacion'
        },
        {
            classMethods: {
                associate: function(models) {
                    Caracterizaciones.hasMany(models.Usuarios, { foreignKey: 'id_caraterizacion' });
                }
            }
        },
        {
            underscored: true
        });

    return Caracterizaciones;
}
