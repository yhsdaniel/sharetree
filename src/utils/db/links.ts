import mongoose from 'mongoose'

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Link = mongoose.models.links || mongoose.model('links', LinkSchema)
export default Link