import logger from './transport';

export const logyard = (level, msg, Context = {}) => {
  if (level === 'error') logger.error(msg, {Context})  
  else if (level === 'warn') logger.warn(msg, {Context})
  else if (level === 'info') logger.info(msg, {Context})
  else if (level === 'http') logger.http(msg, {Context})
  else if (level === 'verbose') logger.verbose(msg, {Context})
  else if (level === 'debug') logger.debug(msg, {Context})
  else if (level === 'silly') logger.silly(msg, {Context})
  else console.log('Invalid Level Input');
}

/*
Steps to using Express Logger:

1. Add app.use(addLoggerExp('key', 'value')) -> This adds a key value pair to the context object. Can also be invoked with no args
2. Add addContextExp('key', 'value') to a middleware chain. -> This adds another key value pair to the context object. Can be done as many times as necessary.
3. Add createLogExp('level', 'message') to a middleware chain. -> This is what sends the log to the database
4. (optional) Add removeContextExp('key') to a middleware chain. -> This removes a key value pair from the context object, and should only be used after an addContextExp.

*/

export function addContextExp(key, value){
  return (req, res, next)=>{
    try {
      res.locals.logger.context[key] = value;
    return next();
    } catch (e) {
        return next({log: `addContextExp ERROR: ${e}`,
        status: e.status || 500,
        message: {
          err: 'Error with addContextExp',
          },
        });
    }
  };
};

export function addLoggerExp(key, value) {
  return (req, res, next)=>{
    try {
      if (!key || !value){
        res.locals.logger = {
          context: {},
          log: logyard
        };
        return next();
      }
      res.locals.logger = {
        context: { [key]: value },
        log: logyard
      };

      return next();
    } catch (e) {
        return next({log: `addLoggerExp ERROR: ${e}`,
        status: e.status || 500,
        message: {
          err: 'Error with addLoggerExp',
          },
        });
    }
  };
};

export function createLogExp (level, message) {
  return (req, res, next) => {
    try {
      const context = res.locals.logger.context;
    res.locals.logger.log(level, message, context);
    } catch (e) {
      return next({log: `createLogExp ERROR: ${e}`,
        status: e.status || 500,
        message: {
          err: 'Error with createLogExp',
          },
        });
    }
    
    next();
  };
};

export function removeContextExp (key) {
  return (req, res, next)=>{
    try {
          delete res.locals.logger.context[key];

          return next();
    } catch (e) {
      return next({log: `removeContextExp ERROR: ${e}`,
        status: e.status || 500,
        message: {
          err: 'Error with removeContextExp',
          },
        });
    }
  };
};