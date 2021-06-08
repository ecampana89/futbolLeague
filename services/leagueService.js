const logger = require('../config/server/logger')(__filename)
const CompetitionModel = require('../models/competitionModel')
const axios = require('axios')
const error = require('../commons/error')
const config = require('config')
const exceptions = require('../commons/exceptions')

const getLeagueByCode = code => {
    logger.info(`getLeagueByCode - id[${code}]`)
    return CompetitionModel.findOne({code}).lean()
}

const importLeague = async code => {
    logger.info(`importLeague - code[${code}]`)
    let leagueResponse
    let teamsResponse
    try {
        leagueResponse = await axios.get(
            `${config.get('league.url')}competitions/${code}`,
            {
                headers: {'X-Auth-Token': `${config.get('league.token')}`}
            })

        teamsResponse = await axios.get(`${config.get('league.url')}competitions/${code}/teams`,
            {
                headers: {'X-Auth-Token': `${config.get('league.token')}`}
            })

    } catch (err) {
        throw new error.AppError(exceptions.exceptionType.league.cannotImportLeague, 'leagueService.importLeague')
    }
    return {
        league: leagueResponse,
        teams: teamsResponse,
    }
}

const create = async league => {
    logger.info(`create - league[${JSON.stringify(league)}]`)
    const newCompetition = new CompetitionModel({
        name: league.name,
        code: league.code,
        areaName: league.area.name,
    })
    const savedCompetition = await newCompetition.save({new: true})

    if (savedCompetition) {
        return {id: savedCompetition.id}
    }
    throw new error.AppError(exceptions.exceptionType.league.cannotCreateLeague, 'leagueService.create')
}

module.exports = {
    getLeagueByCode,
    importLeague,
    create,
}
