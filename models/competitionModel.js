const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema


const CompetitionSchema = new Schema({
    name: String,
    code: String,
    areaName: String,
})

CompetitionSchema.plugin(timestamps, {
    createdAt: 'createdAt',
    updatedAt: 'modifiedAt'
})

CompetitionSchema.options.toJSON = {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
    }
}

module.exports = mongoose.model('competitions', CompetitionSchema)
