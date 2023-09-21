"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = require("winston");
require("winston-mongodb");
var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var uri = _config["default"].get('uri');
var level = _config["default"].get('level');
var _default = (0, _winston.createLogger)({
  transports: [
  /* !LOGGER TEMPLATE!
   _id: AUTO GENERATED
  timestamp: AUTO GENERATED
  level: USER DECLARED ( (0)error, (1)warn, (2)info, (3)http, (4)verbose, (5)debug, (6)silly )
  message: USER DECLARED
  meta: {
    Context1: USER DECLARED
    Context2: USER DECLARED
  }
   */

  new _winston.transports.MongoDB({
    // to collect all level types in DB, put this as 'silly'. Anything at or below the indicated level here will be placed in the database.
    level: level,
    db: uri,
    options: {
      useUnifiedTopology: true
    },
    // dbName and collection MUST match the location at which the mongo server is pointing to in db.js!
    dbName: 'your_database_name',
    collection: 'logs',
    format: _winston.format.combine(_winston.format.json(), _winston.format.metadata())
  })]
});
exports["default"] = _default;