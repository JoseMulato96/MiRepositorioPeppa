'use strict';

export default function(sequelize, DataTypes) {
  var LibretasMilitar = sequelize.define('LibretasMilitar', {
    id_libreta_militar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_libreta_militar: {
      type: DataTypes.STRING('45'),
      allowNull: false
    }
  },
    {
      tableName: 'libreta_militar',
      timestamp: false
    },
    {
      classMethods: {
        associate: function(models){
          LibretasMilitar.hasMany(models.Usuarios, {foreignKey: 'id_libreta_militar'});
        }
      }
    });

    return LibretasMilitar;
}
