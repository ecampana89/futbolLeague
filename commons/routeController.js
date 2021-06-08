const error = require('../commons/error')
const logger = require('../config/server/logger')(__filename)

async function handleRequest (req, res, methodController, next) {
  try {
    logger.info(`handleRequest - controllerMethodName[${methodController.name}]`)
    await methodController(req, res, next)
  } catch (ex) {
    logger.error(`handleRequest - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`)
    error.errorHandler(res, ex)
  }
}

module.exports = {
  handleRequest
}
