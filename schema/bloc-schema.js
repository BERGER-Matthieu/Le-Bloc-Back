import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Bloc = new Schema({
  id: ObjectId,
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
  user: String,
});

export const BlocModel = mongoose.model("BlocModel", Bloc, "Blocs");
