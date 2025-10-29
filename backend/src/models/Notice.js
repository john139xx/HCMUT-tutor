// models/Notice.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notice = sequelize.define('Notice', {
  title:      { type: DataTypes.STRING, allowNull: false },
  postedDate: { type: DataTypes.DATE,   allowNull: false, defaultValue: DataTypes.NOW },
  deadline:   { type: DataTypes.DATE,   allowNull: false },
  pdfLink:    { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'notices',
  timestamps: true,
});

module.exports = Notice;
