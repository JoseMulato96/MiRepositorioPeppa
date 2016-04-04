/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var LineasTecnologicas = sequelize.define('LineasTecnologicas', {
        idLineaTecnologica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_linea_tecnologica'
        },
        nombreLineaTecnologica: {
            type: DataTypes.STRING(120),
            allowNull: false,
            field: 'nombre_linea_tecnologica'
        },
        
    },
    {
          tableName: 'linea_tecnologica'
    },
    {
          classMethods:{
              associate:function(models){
                LineasTecnologicas.hasMany(models.RedesTecnologicas,{foreignKey:'idLineaTecnologica'});
              }
          }
  },
  {
     underscored: true
  });
    return LineasTecnologicas;
}
