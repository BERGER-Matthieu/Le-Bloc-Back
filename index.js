import * as messageController from './controllers/message-controller.js'
import * as regionController from './controllers/region-controller.js'
import * as spotController from './controllers/spot-controller.js'
import * as userController from './controllers/user-controller.js'
import * as blocController from './controllers/bloc-controller.js'
import * as spotController from './controllers/spot-controller.js'
import * as messageController from './controllers/message-controller.js'
import * as addressController from './controllers/adresse-controller.js'
import * as lbBrain from './lbb-brain.js'

import bodyParser from 'body-parser'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const atlasUrl = process.env.ATLAS_URL;

mongoose.connect(`${atlasUrl}/LeBlocBleau`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

const app = express();

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//PUT
app.put('/LBB/createUser', userController.createUser);
app.put('/LBB/createSpot', spotController.createSpot);

//POST
app.post('/LBB/loginUser', userController.loginUser);

app.post('/LBB/getUserById', userController.getUserById);

app.post('/LBB/updateUser', userController.updateUser);

app.post('/LBB/sendMessage', messageController.sendMessage);

//GET
app.get('/LBB/getFirtsMessageOf/:senderId:receiverId', messageController.getFirtsMessageOf);

app.get('/LBB/getBlocDataByName/:name', blocController.getBlocDataByName);

app.get('/LBB/getAllBloc', blocController.getAllBloc);

app.get('/LBB/getBlocsBySpot/:spot', blocController.getBlocsBySpot);

app.get('/LBB/getBlocImgByName/:name', blocController.getBlocImgByName);

app.get('/LBB/getAllSpot', spotController.getAllSpot);

app.get('/LBB/getSpotDataByName/:name', spotController.getSpotDataByName);

app.get('/LBB/getSpotDataById/:id', spotController.getSpotDataById);

app.get('/LBB/getSpotsByRegion/:region', spotController.getSpotsByRegion);

app.get('/LBB/getRegionDataByName/:name', regionController.getRegionDataByName);

app.get('/LBB/getAllRegion/', regionController.getAllRegion);

app.get('/LBB/CreateBloc/', blocController.createBloc);

app.get('/LBB/getAddress', addressController.getAddressController);

//DELETE
app.delete('/LBB/deleteUser', userController.deleteUser);


const expressServer = app.listen(3001, () => {
    console.log("✅ : App connected to port 3001\n");
})

const io = new Server(expressServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let userIdToSocketId = {};
let socketIdToUserId = {};


io.on('connection', (socket) => {
    console.log('✅ : Socket connected\n');

    const senderToken = socket.handshake.query.senderToken;
    const userId = lbBrain.decodeToken(senderToken).id;

    if (userIdToSocketId[userId]) {
        userIdToSocketId[userId] = socket.id;
        socketIdToUserId[socket.id] = userId;
    }
    userIdToSocketId[userId] = socket.id;
    socketIdToUserId[socket.id] = userId;

    console.log('🔌 : New connection', userIdToSocketId, socketIdToUserId);

    socket.on('message', (msg) => {
        if (userIdToSocketId[msg.receiverId]) {
            io.to(userIdToSocketId[msg.receiverId]).to(socket.id).emit('message', {content : msg.content, receiverId : msg.receiverId});
        } else {
            io.to(socket.id).emit('message', {content : msg.content, receiverId : msg.receiverId});
        }
    });
    
    socket.on('disconnect', () => {
        console.log('socket.id', socket.id, 'disconnected');

        delete userIdToSocketId[socketIdToUserId[socket.id]];
        delete socketIdToUserId[socket.id];

        console.log(userIdToSocketId);
        console.log(socketIdToUserId);
    });
});

io.listen(3002);
