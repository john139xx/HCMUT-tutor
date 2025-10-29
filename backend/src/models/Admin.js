// models/Admin.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  adminNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  password:    { type: DataTypes.STRING, allowNull: false },
  email:       { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  tableName: 'admins',
  timestamps: true,
});

// Hash mật khẩu trước khi save
Admin.beforeCreate(async (admin) => {
  admin.password = await bcrypt.hash(admin.password, 10);
});
Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
});

// Helper so sánh mật khẩu
Admin.prototype.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = Admin;
