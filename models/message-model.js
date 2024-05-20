import * as MessageSchema from '../schema/message-schema.js'
import * as lbBrain from '../lbb-brain.js';

export async function sendMessage(req){
    console.log("🛠️  : sendMessage");
    try {
        const user = {
            sender: lbBrain.decodeToken(req.body.senderToken).id,
            receiver: req.body.receiverId,
            content: req.body.content
        }
        await MessageSchema.MessageModel.create(user);
        return {message: "message sent"};
    }
    catch (e){
        throw({'error': e});
    }
}

export async function getFirtsMessageOf(req){
    console.log("🛠️  : getFirstsMessageOf");
    try {
        const senderId = req.params['senderId'];
        const receiverId = req.params['receiverId'];
        const filter = {name: name}
        const bloc = await MessageSchema.MessageModel.findOne(filter);
        if (!bloc) {
            throw('no such bloc');
        }
        return(bloc);
    }
    catch (e) {
        throw({'error': e})
    } 
}