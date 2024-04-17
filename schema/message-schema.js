import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

export const Message = new Schema({
    id: ObjectId,
    sender: { type: ObjectId, ref: 'User' },
    receiver: { type: ObjectId, ref: 'User' },
    content: String,
});

export const MessageModel = mongoose.model('MessageModel', Message, 'Messages');