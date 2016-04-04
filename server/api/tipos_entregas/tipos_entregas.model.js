/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
  var TiposEntregas= sequelize.define('TiposEntregas', {
    id_tipo_entrega: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tipo_entrega:{
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    tableName:"tipo_entrega",
    underscored: true
  },
  {
      classMethods:{
        associate:function(models){
          TiposEntregas.hasMany(models.Evidencias,{foreignKey:'id_tipo_entrega'});
        }
      }
    }
  );
  return TiposEntregas;
}
