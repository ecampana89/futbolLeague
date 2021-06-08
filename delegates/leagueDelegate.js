const leagueService = require('../services/leagueService')
const teamService = require('../services/teamService')
const teamDelegate = require('../delegates/teamDelegate')
const playerService = require('../services/playerService')
const logger = require('../config/server/logger')(__filename)


const importLeague = async code => {
    logger.info(`importLeague - id[${code}]`)
    const {league, teams} = await leagueService.importLeague(code)
    const savedLeagueId = await leagueService.create(league.data)
    const teamsArr = teams.data.teams;
    let squadArr = await getTeams(teamsArr, savedLeagueId.id)
    await getPlayers(squadArr)
    return league.data;
}

async function getTeams(teams, id) {
    let squadArr = []
    for (const team of teams) {
        const teamId = await teamService.create(team, id)
        let squad = await teamService.importTeams(team.id)
        if (squad) {
            squadArr.push({squad: squad.data, teamId: teamId.id});
        }
    }
    return squadArr
}

async function getPlayers(squads) {
    for (const squad of squads) {
        for (const sq of squad.squad.squad) {
            await playerService.create(sq, squad.teamId)
        }
    }
}


const getLeagueByCode = async code => {
    logger.info(`getLeagueByCode - id[${code}]`)
    let league = await leagueService.getLeagueByCode(code)
    let teams = await teamDelegate.getTeamsByLeague(league)
    return {...league,teams}
}

module.exports = {
    getLeagueByCode,
    importLeague,
}
