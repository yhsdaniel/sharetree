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
    link: [{
        type: Schema.Types.ObjectId,
        ref: 'links'
    }]
}, { timestamps: true })

const User = mongoose.models.user || mongoose.model('user', UserSchema)
export default User