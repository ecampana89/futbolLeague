const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema


const PlayerSchema = new Schema({
    name: String,
    position: String,
    dateOfBirth: String,
    countryOfBirth: String,
    nationality:String,
    team:{ type: Schema.Types.ObjectId, ref: 'teams' },
})

PlayerSchema.plugin(timestamps, {
    createdAt: 'createdAt',
    updatedAt: 'modifiedAt'
})

PlayerSchema.options.toJSON = {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        return ret
    }
}

module.exports = mongoose.model('players', PlayerSchema)
