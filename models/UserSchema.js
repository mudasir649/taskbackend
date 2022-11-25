// user schema for login and registration
import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    token: String
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;