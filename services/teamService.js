const logger = require('../config/server/logger')(__filename)
const TeamModel = require('../models/teamModel')
const axios = require('axios')
const error = require('../commons/error')
const config = require('config')
const exceptions = require('../commons/exceptions')

const importTeams = async id => {
    logger.info(`importTeams - id[${id}]`)
    let teamResponse
    try {
        teamResponse = await axios.get(
            `${config.get('league.url')}teams/${id}`,
            {
                headers: {'X-Auth-Token': `${config.get('league.token')}`}
            })
    } catch (err) {
        logger.error(err)
        // throw new error.AppError(exceptions.exceptionType.team.cannotImportTeam, 'teamService.create')
    }
    return teamResponse
}

const create = async (team,leagueId) => {
    logger.info(`create - team[${JSON.stringify(team)}] - leagueId[${JSON.stringify(leagueId)}]`)
    const newTeam = new TeamModel({
        name: team.name,
        shortName: team.shortName,
        tla: team.tla,
        email: team.email,
        areaName: team.area.name,
        league: leagueId
    })
    const savedTeam = await newTeam.save({new: true})

    if (savedTeam) {
        return {id: savedTeam.id}
    }
    throw new error.AppError(exceptions.exceptionType.team.cannotCreateTeam, 'teamService.create')
}

const getTeamsByLeague = async (league) => {
    logger.info(`getTeamsByLeague - league[${JSON.stringify(league)}]`)
    return TeamModel.find({league}).lean()
}


module.exports = {
    importTeams,
    create,
    getTeamsByLeague
}

