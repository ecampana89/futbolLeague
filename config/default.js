require('dotenv').config()

module.exports = {
  apiConfig: 'default',
  apiPrefix: '/api/v1',
  auth: {
    secret: 'accelone1234',
    tokenExpire: 86400
  },
  mongo: {
    url: 'mongodb://localhost:27017/admin',
    options: {
      dbName: 'soccer-league',
      socketTimeoutMS: 10000,
      keepAlive: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  },
  domain: 'http://localhost:3000',
  logs: {
    colorize: false
  },
  tmpFolder: '/tmp',
  league: {
    url:process.env.API_LEAGUE_URL,
    token: process.env.API_LEAGUE_TOKEN,
  }
}
