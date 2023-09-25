var $c5L0i$winston = require("winston");
require("winston-mongodb");
var $c5L0i$config = require("config");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "logyard", () => $43d7963e56408b24$export$317ecf0a65c11642);
$parcel$export(module.exports, "addContextExp", () => $43d7963e56408b24$export$75febc7dcd45dbe3);
$parcel$export(module.exports, "addLoggerExp", () => $43d7963e56408b24$export$363c0fdb94997b47);
$parcel$export(module.exports, "createLogExp", () => $43d7963e56408b24$export$87cd6476fca77861);
$parcel$export(module.exports, "removeContextExp", () => $43d7963e56408b24$export$13b03d519823f13f);



const $59153805fe1312d8$var$uri = (0, ($parcel$interopDefault($c5L0i$config))).get("uri");
const $59153805fe1312d8$var$level = (0, ($parcel$interopDefault($c5L0i$config))).get("level");
const $59153805fe1312d8$var$dbName = (0, ($parcel$interopDefault($c5L0i$config))).get("dbName");
var $59153805fe1312d8$export$2e2bcd8739ae039 = (0, $c5L0i$winston.createLogger)({
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

    */ new (0, $c5L0i$winston.transports).MongoDB({
            level: // to collect all level types in DB, put this as 'silly'. Anything at or below the indicated level here will be placed in the database.
            $59153805fe1312d8$var$level,
            db: $59153805fe1312d8$var$uri,
            options: {
                useUnifiedTopology: true
            },
            // dbName and collection MUST match the location at which the mongo server is pointing to in db.js!
            dbName: `${$59153805fe1312d8$var$dbName || "LogYard"}`,
            collection: "logs",
            format: (0, $c5L0i$winston.format).combine((0, $c5L0i$winston.format).json(), (0, $c5L0i$winston.format).metadata())
        })
    ]
});


const $43d7963e56408b24$export$317ecf0a65c11642 = (level, msg, Context = {})=>{
    for(const key in Context)if (typeof Context[key] === "object") Context[key] = "INVALID CONTEXT";
    if (level === "error") (0, $59153805fe1312d8$export$2e2bcd8739ae039).error(msg, {
        Context: Context
    });
    else if (level === "warn") (0, $59153805fe1312d8$export$2e2bcd8739ae039).warn(msg, {
        Context: Context
    });
    else if (level === "info") (0, $59153805fe1312d8$export$2e2bcd8739ae039).info(msg, {
        Context: Context
    });
    else if (level === "http") (0, $59153805fe1312d8$export$2e2bcd8739ae039).http(msg, {
        Context: Context
    });
    else if (level === "verbose") (0, $59153805fe1312d8$export$2e2bcd8739ae039).verbose(msg, {
        Context: Context
    });
    else if (level === "debug") (0, $59153805fe1312d8$export$2e2bcd8739ae039).debug(msg, {
        Context: Context
    });
    else if (level === "silly") (0, $59153805fe1312d8$export$2e2bcd8739ae039).silly(msg, {
        Context: Context
    });
    else console.log("Invalid Level Input");
};
function $43d7963e56408b24$export$75febc7dcd45dbe3(key, value) {
    return (req, res, next)=>{
        try {
            res.locals.logger.context[key] = value;
            return next();
        } catch (e) {
            return next({
                log: `addContextExp ERROR: ${e}`,
                status: e.status || 500,
                message: {
                    err: "Error with addContextExp"
                }
            });
        }
    };
}
function $43d7963e56408b24$export$363c0fdb94997b47(key, value) {
    return (req, res, next)=>{
        try {
            if (!key || !value) {
                res.locals.logger = {
                    context: {},
                    log: $43d7963e56408b24$export$317ecf0a65c11642
                };
                return next();
            }
            res.locals.logger = {
                context: {
                    [key]: value
                },
                log: $43d7963e56408b24$export$317ecf0a65c11642
            };
            return next();
        } catch (e) {
            return next({
                log: `addLoggerExp ERROR: ${e}`,
                status: e.status || 500,
                message: {
                    err: "Error with addLoggerExp"
                }
            });
        }
    };
}
function $43d7963e56408b24$export$87cd6476fca77861(level, message) {
    return (req, res, next)=>{
        try {
            const context = res.locals.logger.context;
            res.locals.logger.log(level, message, context);
        } catch (e) {
            return next({
                log: `createLogExp ERROR: ${e}`,
                status: e.status || 500,
                message: {
                    err: "Error with createLogExp"
                }
            });
        }
        next();
    };
}
function $43d7963e56408b24$export$13b03d519823f13f(key) {
    return (req, res, next)=>{
        try {
            delete res.locals.logger.context[key];
            return next();
        } catch (e) {
            return next({
                log: `removeContextExp ERROR: ${e}`,
                status: e.status || 500,
                message: {
                    err: "Error with removeContextExp"
                }
            });
        }
    };
}


//# sourceMappingURL=indexCJS.cjs.map
