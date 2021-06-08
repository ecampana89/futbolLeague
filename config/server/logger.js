'use strict'

const winston = require('winston')
const winstonConfig = winston.config
const config = require('config')
const httpContext = require('express-http-context')
const constants = require('../../commons/constants')

winston.emitErrs = true

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOGS_CONSOLE_LEVEL || 'debug',
      silent: process.env.LOGS_CONSOLE_SILENT || false,
      handleExceptions: true,
      json: false,
      colorize: config.get('logs.colorize'),
      formatter: options => logFormatter(options)
    })
  ],
  exitOnError: false
})

const getTimestamp = () => new Date().toISOString()

const logFormatter = options => {
  const requestId = httpContext.get(constants.app.headerRequestId)
  let timestamp = trimOrExtendText(24, getTimestamp())
  let level = options.colorize
      ? winstonConfig.colorize(options.level, trimOrExtendText(5, options.level.toUpperCase()))
      : trimOrExtendText(5, options.level.toUpperCase())
  let file = trimOrExtendText(50, options.message.substring(0, options.message.indexOf(':')), true)
  let message = options.message.substring(options.message.indexOf(':') + 2)
  return (
      '[' +
      timestamp +
      '] [' +
      requestId +
      '] [' +
      level +
      '] [' +
      file +
      '] - ' +
      message +
      (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
  )
}

const trimOrExtendText = (length, text, inverted = false) => {
  if (text.length < length) {
    text += ' '.repeat(length - text.length)
  }
  if (text.length > length) {
    if (!inverted) {
      text = text.substring(0, text.length - length - 3) + '...'
    } else {
      text = '...' + text.substring(text.length - length + 3)
    }
  }
  return text
}

module.exports = fileName => {
  let loggerWithFile = {
    error: text => {
      logger.error(fileName + ': ' + text)
    },
    warn: text => {
      logger.warn(fileName + ': ' + text)
    },
    info: text => {
      logger.info(fileName + ': ' + text)
    },
    debug: text => {
      logger.debug(fileName + ': ' + text)
    },
    silly: text => {
      logger.silly(fileName + ': ' + text)
    }
  }
  loggerWithFile.stream = {
    write: message => {
      logger.info(message)
    }
  }
  return loggerWithFile
}
