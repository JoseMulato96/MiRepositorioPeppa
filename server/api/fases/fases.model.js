'use strict';

export default function(sequelize, DataTypes) {
  var Fases = sequelize.define('Fases', {
    id_fase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fase: {
      type: DataTypes.STRING(45),
      allowNull: false
  }
 },
  {
    tableName: 'fase'
  },
  {
    classMethods: {
      associate: function(models){
        Fases.hasMany(models.Actividades, {foreignKey: 'id_fase'});
      }
    }
  });

  return Fases;
}
