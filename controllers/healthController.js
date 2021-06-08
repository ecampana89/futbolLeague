
const health = async (req, res) => {
    let ret = {message:"on"}
    return res.status(200).json(ret)
}


module.exports = {
    health,
}
