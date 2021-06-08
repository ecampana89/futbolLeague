const express = require('express')
const routeController = require('../commons/routeController')
const healthController = require('../controllers/healthController')

const router = express.Router()

router.get('/', async (req, res) => {
   routeController.handleRequest(req, res, healthController.health)
})

module.exports = router
