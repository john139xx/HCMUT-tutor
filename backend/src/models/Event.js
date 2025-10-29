// models/Event.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  name:   { type: DataTypes.STRING, allowNull: false },
  date:   { type: DataTypes.DATE,   allowNull: false },
  images: { type: DataTypes.JSON,   allowNull: true, defaultValue: [] } // [{url, public_id}]
}, {
  tableName: 'events',
  timestamps: true,
});

module.exports = Event;
