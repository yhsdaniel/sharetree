import mongoose from 'mongoose'

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
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    link: [{
        type: Schema.Types.ObjectId,
        ref: 'links'
    }]
}, { timestamps: true })

const User = mongoose.models.users || mongoose.model('users', UserSchema)

export default User