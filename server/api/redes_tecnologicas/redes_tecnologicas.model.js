/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var RedesTecnologicas = sequelize.define('RedesTecnologicas', {
        idRedTecnologica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_red_tecnologica'
        },
        nombreRedTecnologica: {
            type: DataTypes.STRING(120),
            allowNull: false,
            field: 'nombre_red_tecnologica'
        },
        idLineaTecnologica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            field: 'id_linea_tecnologica',
            references: {
                model: 'linea_tecnologica',
                key: 'id_linea_tecnologica'
            }
        }
    },
    {
        tableName: 'red_tecnologica'
    },
    {
          classMethods:{
              associate:function(models){
                RedesTecnologicas.hasMany(models.Programas,{foreignKey:'idRedTecnologica'});
              }
          }
  },
  {
     underscored: true
  });
    return RedesTecnologicas;
}