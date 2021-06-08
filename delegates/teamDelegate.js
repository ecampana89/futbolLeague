const teamService = require('../services/teamService')
const playerService = require('../services/playerService')
const logger = require('../config/server/logger')(__filename)

const getTeamsByLeague = async league => {
    logger.info(`getTeamsByLeague - league[${league}]`)
    let teams = await teamService.getTeamsByLeague(league._id)
    teams = getPlayers(teams);
    return teams
}

async function getPlayers(teams) {
    for (const team of teams) {
        team.players = await playerService.getPlayersByTeam(team._id)
    }
    return teams
}

module.exports = {
    getTeamsByLeague
}
