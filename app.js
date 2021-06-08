'use strict'

const app = require('express')()
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logger = require('./config/server/logger')(__filename)
const config = require('config')
const mongoose = require('mongoose')
const httpContext = require('express-http-context')
const apiPrefix = config.get('apiPrefix')

process.title = 'accelone'

app.disable('x-powered-by')
app.use(morgan('short', { stream: logger.stream }))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }))
app.use(bodyParser.text({ limit: '1mb', type: 'application/octet-stream' }))


/* GET home page. */
app.get('/', (req, res) => {
  res.json("Back-end is up in '" + config.get('apiConfig') + "' mode.")
})

app.use(httpContext.middleware)


app.use(apiPrefix + '/league', require('./routes/leagueRoute'))
app.use(apiPrefix + '/health', require('./routes/healthRoute'))


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

const initializeBackingServices = async () => {
  mongoose.Promise = global.Promise
  try {
    await Promise.all([
      mongoose.connect(config.get('mongo.url'), config.get('mongo.options')),
    ])
    logger.info(`Connected to MongoDB`)
  } catch (err) {
    logger.error(`An error occur during Initialize Backing Services. Detail: ${err}`)
    process.exit()
  }
}
initializeBackingServices()
module.exports = app
