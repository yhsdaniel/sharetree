import { connect } from '@/lib/mongodb'
import mongoose from 'mongoose'

connect()

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
        ref: 'users'
    }]
})

const Link = mongoose.models.link || mongoose.model('link', LinkSchema)
export default Link