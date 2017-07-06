/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      // 字段类型
      type: DataTypes.INTEGER(11).UNSIGNED,
      // 是否必填
      allowNull: false,
      // 主健
      primaryKey: true,
      // 是否自增
      autoIncrement: true
    },
    user_name: {
      // 最大长度50
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: true
    }
  }, {
    // 表名
    tableName: 'user'
  });
};
