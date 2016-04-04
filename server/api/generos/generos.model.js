/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var Generos = sequelize.define('Generos', {
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_genero: {
      type: DataTypes.STRING('10'),
      allowNull: false
    }
  },
  {
    tableName: 'genero',
    underscored: true
  },
  {
    classMethods: {
      associate: function(models){
        Generos.hasMany(models.Usuarios, {foreignKey: 'id_genero'});
      }
    }
  });

  return Generos;
}
