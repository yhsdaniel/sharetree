import mongoose from 'mongoose'
import Link from './links'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email address"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
        ]
    },
    password: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
    },
    link: [{
        type: Schema.Types.ObjectId,
        ref: 'Link'
    }]
}, { timestamps: true })

const User = mongoose.models.Users || mongoose.model('Users', UserSchema)
export default User