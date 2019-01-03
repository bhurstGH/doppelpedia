'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  Wiki.addScope("newest", () => {
    return {
      limit: 5,
      order:[["createdAt", "DESC"]]
    }
  });
  Wiki.addScope("updated", () => {
    return {
      limit: 5,
      order: [["updatedAt", "DESC"]]
    }
  });
  return Wiki;
};