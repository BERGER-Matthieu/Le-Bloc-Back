import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Spot = new Schema({
    id: ObjectId,
    region: String,
    name: String,
    tag: String,
    description: String,
    coord: String,
    url: String
});

export const SpotModel = mongoose.model('SpotModel', Spot, 'Spots');