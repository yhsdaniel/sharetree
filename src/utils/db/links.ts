import mongoose from 'mongoose'
import User from './user'

const Schema = mongoose.Schema
const LinkSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
})

const Link = mongoose.models.Link || mongoose.model('Link', LinkSchema)
export default Link