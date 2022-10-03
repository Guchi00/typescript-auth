import mongoose from "mongoose";

export const UserAuthenticationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: 0
    }
});

const UserSchema = mongoose.model("UserSchema", UserAuthenticationSchema);
export default UserSchema;