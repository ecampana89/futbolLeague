const express = require('express')
const leagueController = require('../controllers/leagueController')
const routeController = require('../commons/routeController')

const router = express.Router()


router.get('/import', async (req, res) => {
   routeController.handleRequest(req, res, leagueController.importLeague)
})

router.get('/', async (req, res) => {
   routeController.handleRequest(req, res, leagueController.getLeagueData)
})


module.exports = router
