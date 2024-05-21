import * as BlocSchema from "../schema/bloc-schema.js";
import path from "path";
import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as lbBrain from '../lbb-brain.js';
import * as user from "./user-model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createBloc({body}){
    console.log("🛠️  : create bloc");
    try {
        if (body['name'] == undefined || body['cotation'] == undefined || body['description'] == undefined || body['img'] == undefined) {
            console.log(body)
            throw('missing data');
        }

        const newBloc = new BlocSchema.BlocModel();
        
        const bloc = {
            name: body.name,
            spot: body.spot,
            cotation: body.cotation,
            description: body.description,
            region: (body.region === undefined || body.region === "") ? "none" : body.region,
            url: `${newBloc._id}.png`
        }

        newBloc.set(bloc);
        newBloc.save();
        
        var base64Data = body.img.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFile(`../Le-Bloc-Image/${newBloc._id}.jpeg`, base64Data, 'base64', function(err) {
            console.log(err);
        });

        return {message: "Bloc created"};
    }
    catch (e){
        throw({'error': e});
    }
}

export async function getBlocDataByName(req){
    try {
        const name = req.params['name'];
        const filter = {name: name}
        const bloc = await BlocSchema.BlocModel.findOne(filter);
        if (!bloc) {
            throw('no such bloc');
        }
        return(bloc);
    }
    catch (e) {
        throw(e)
    } 
}

export async function getBlocImgByName(req) {
    const name = req.params['name'];
    console.log("🛠️  : Get bloc img by name");
    if (fs.existsSync(`../Le-Bloc-Image/${name}.png`)) {
        let imagePath = path.resolve(__dirname, '..', '..', 'LBB-assets', 'blocs-img', `${name}.png`);
        console.log(imagePath)
        console.log("✅ : Img found\n");
        return(imagePath)
    } else {
        throw('no such blocs')
    }
}

export async function getBlocImgById(req) {
    const id = req.params['id'];
    console.log(id)
    console.log("🛠️  : Get bloc img by id");
    if (fs.existsSync(`../Le-Bloc-Image/${id}.jpeg`)) {
        let imagePath = path.resolve(__dirname, '..', '..',  'Le-Bloc-Image', `${id}.jpeg`);
        console.log(imagePath)
        console.log("✅ : Img found\n");
        return(imagePath)
    } else {
        throw('no such blocs')
    }
}

export async function getBlocsBySpot(req){
    try {
        console.log(req.params)
        const spot = req.params['spot'];
        const filter = {spot: spot}
        const bloc = await BlocSchema.BlocModel.find(filter);
        if (!bloc) {
            throw('no such bloc');
        }
        return(bloc);
    }
    catch (e) {
        throw(e)
    } 
}

export async function getAllBloc(req) {
  try {
    const bloc = await BlocSchema.BlocModel.find();
    if (!bloc) {
      throw "no such bloc";
    }
    return bloc;
  } catch (e) {
    throw e;
  }
}
