import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true
    },
    active: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.users || mongoose.model('users', UserSchema)

export default User