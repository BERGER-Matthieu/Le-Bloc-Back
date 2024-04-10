import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Bloc = new Schema({
    id: ObjectId,
    spot: String,
    cotation: String,
    description: String,
    url: String,
    img: String
});

export const Spot = new Schema({
    id: ObjectId,
    region: String,
    name: String,
    tag: String,
    description: String,
    coord: String,
    url: String
});

export const Region = new Schema({
    id: ObjectId,
    name: String
});

export const User = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    mail: String,
    jwt: String
});

export const BlocModel = mongoose.model('BlocModel', Bloc, 'Blocs');
export const SpotModel = mongoose.model('SpotModel', Spot, 'Spots');
export const RegionModel = mongoose.model('RegionModel', Region, 'Regions');
export const UserModel = mongoose.model('userModel', User, 'Users');