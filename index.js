import * as regionController from './controllers/region-controller.js'
import * as userController from './controllers/user-controller.js'
import * as blocController from './controllers/bloc-controller.js'
import * as spotController from './controllers/spot-controller.js'
import * as messageController from './controllers/message-controller.js'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

dotenv.config()
const atlasUrl = process.env.ATLAS_URL;
mongoose.connect(`${atlasUrl}/LeBlocBleau`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !', err));

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.put('/LBB/createUser', userController.createUser);

app.post('/LBB/loginUser', userController.loginUser);

app.post('/LBB/getUser', userController.getUser);

app.post('/LBB/updateUser', userController.updateUser);

app.post('/LBB/sendMessage', messageController.sendMessage);

app.delete('/LBB/deleteUser', userController.deleteUser);

app.get('/LBB/getBlocDataByName/:name', blocController.getBlocDataByName);

app.get('/LBB/getAllBloc', blocController.getAllBloc);

app.get('/LBB/getBlocsBySpot/:spot', blocController.getBlocsBySpot);

app.get('/LBB/getBlocImgByName/:name', blocController.getBlocImgByName);

app.get('/LBB/getAllSpot', spotController.getAllSpot);

app.get('/LBB/getSpotDataByName/:name', spotController.getSpotDataByName);

app.get('/LBB/getSpotsByRegion/:region', spotController.getSpotsByRegion);

app.get('/LBB/getRegionDataByName/:name', regionController.getRegionDataByName);

app.get('/LBB/getAllRegion/', regionController.getAllRegion);

app.listen(3001, () => {
    console.log("✅ : App connected to port 3001\n");
})