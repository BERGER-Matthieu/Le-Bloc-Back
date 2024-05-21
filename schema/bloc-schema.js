import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Bloc = new Schema({
    id: ObjectId,
    name: String,
    spot: String,
    cotation: String,
    description: String,
    url: String,
    img: String
});

export const BlocModel = mongoose.model('BlocModel', Bloc, 'Blocs');