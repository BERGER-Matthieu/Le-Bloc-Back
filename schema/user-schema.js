import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const User = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    mail: String,
    jwt: String
});

export const UserModel = mongoose.model('userModel', User, 'Users');