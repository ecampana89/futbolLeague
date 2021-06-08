const logger = require('../config/server/logger')(__filename)
const PlayerModel = require('../models/playerModel')
const error = require('../commons/error')
const exceptions = require('../commons/exceptions')


const create = async (player,teamId) => {
    logger.info(`create - player[${JSON.stringify(player)}] - teamId[${JSON.stringify(teamId)}]`)
    const newPlayer = new PlayerModel({
        name: player.name,
        position: player.position,
        dateOfBirth: player.dateOfBirth,
        countryOfBirth: player.countryOfBirth,
        nationality: player.nationality,
        team:teamId
    })
    const savedPlayer = await newPlayer.save({new: true})

    if (savedPlayer) {
        return {id: savedPlayer.id}
    }
    throw new error.AppError(exceptions.exceptionType.player.cannotCreatePlayer, 'playerService.create')
}

const getPlayersByTeam = async team =>{
    logger.info(`getPlayersByTeam - team[${JSON.stringify(team)}]`)
    return  PlayerModel.find({team}).lean()
}

module.exports = {
    create,
    getPlayersByTeam
}
