import * as MessageSchema from '../schema/message-schema.js'
import * as lbBrain from '../lbb-brain.js';

export async function sendMessage(req){
    console.log("🛠️  : sendMessage");
    try {
        console.log(req.body)
        console.log(lbBrain.decodeToken(req.body.senderToken))
        const user = {
            sender: lbBrain.decodeToken(req.body.senderToken).id,
            receiver: req.body.receiverId,
            content: req.body.content
        }
        console.log(user)
        await MessageSchema.MessageModel.create(user);
        return {message: "message sent"};
    }
    catch (e){
        throw({'error': e});
    }
}