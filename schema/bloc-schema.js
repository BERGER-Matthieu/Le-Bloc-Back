import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Bloc = new Schema({
  id: ObjectId,
  userId: { type: ObjectId, ref: 'User' },
  spot: String,
  name: String,
  cotation: String,
  description: String,
  url: String,
  img: String,
  position: [{
    longitude: String,
    latitude: String
  }],
});

export const BlocModel = mongoose.model("BlocModel", Bloc, "Blocs");
