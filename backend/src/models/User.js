const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// ✅ Tự động mã hóa mật khẩu trước khi lưu
//User.beforeCreate(async (user) => {
//  user.password = await bcrypt.hash(user.password, 10);
//});

module.exports = User;
