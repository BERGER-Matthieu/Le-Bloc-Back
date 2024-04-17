import * as messageModel from '../models/message-model.js'

export function sendMessage(req, res){
    try {
        const result = messageModel.sendMessage(req);
        result.then((result) => {
            res.status(200).send(result)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send(e)
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
}