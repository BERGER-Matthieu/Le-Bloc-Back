import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Region = new Schema({
    id: ObjectId,
    name: String
});

export const RegionModel = mongoose.model('RegionModel', Region, 'Regions');