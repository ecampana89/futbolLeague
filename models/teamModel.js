const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema


const TeamSchema = new Schema({
    name: String,
    shortName: String,
    tla: String,
    email: String,
    areaName:String,
    league:{ type: Schema.Types.ObjectId, ref: 'competitions' },
})

TeamSchema.plugin(timestamps, {
    createdAt: 'createdAt',
    updatedAt: 'modifiedAt'
})

TeamSchema.options.toJSON = {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
    }
}

module.exports = mongoose.model('teams', TeamSchema)
