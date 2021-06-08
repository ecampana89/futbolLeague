const exceptionType = {
    missingParameters: {
        message: 'Missing required fields',
        code: 100,
        httpStatus: 422
    },
    numbersParameters: {
        message: 'Fields must be numbers',
        code: 101,
        httpStatus: 422
    },
    dateParameters: {
        message: 'Fields must be dates',
        code: 102,
        httpStatus: 422
    },
    arrayParameters: {
        message: 'Fields must be array',
        code: 103,
        httpStatus: 422
    },
    schemaParameter: {
        message: 'Schema validation fails',
        code: 104,
        httpStatus: 422
    },

    invalidValue: {
        message: 'Invalid value',
        code: 2000,
        httpStatus: 400
    },

    notFound: {
        message: 'Not found',
        code: 3000,
        httpStatus: 404
    },

    unhandledException: {
        code: 4000,
        message: 'Unhandled exception',
        httpStatus: 500
    },
    league: {
        cannotCreateLeague: {
            code: 5001,
            message: 'League can not be created',
            httpStatus: 500
        },
        leagueNotFound: {
            code: 5002,
            message: 'League not found',
            httpStatus: 404
        },
        cannotImportLeague: {
            code: 5003,
            message: 'Import League not found',
            httpStatus: 500
        },
    },
    team: {
        cannotCreateTeam: {
            code: 6001,
            message: 'Team can not be created',
            httpStatus: 500
        },
        cannotImportTeam: {
            code: 6002,
            message: 'Team can not be imported',
            httpStatus: 500
        },
    },
    player: {
        cannotCreatePlayer: {
            code: 7001,
            message: 'Player can not be created',
            httpStatus: 500
        },
    }

}


module.exports = {
    exceptionType
}
