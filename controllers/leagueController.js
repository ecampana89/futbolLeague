const leagueDelegate = require('../delegates/leagueDelegate')

const importLeague = async (req, res) => {
    const {code} = req.query
    if (!code) return res.status(400).json({"error": "code is empty"})
    let ret = null
    ret = await leagueDelegate.importLeague(code)
    return res.status(200).json(ret)
}

const getLeagueData = async (req, res) => {
    const {code} = req.query
    if (!code) return res.status(400).json({"error": "code is empty"})
    let ret = null
    ret = await leagueDelegate.getLeagueByCode(code)
    return res.status(200).json(ret)
}


module.exports = {
    importLeague,
    getLeagueData
}
