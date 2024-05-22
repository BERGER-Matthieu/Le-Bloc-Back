import * as SpotSchema from '../schema/spot-schema.js'
import { decodeToken } from '../lbb-brain.js'

export async function createSpot({body}){
    console.log("🛠️  : create spot");
    try {
        const newSpot = {
            region: body.region,
            name: body.name,
            tag: body.tag,
            description: body.description,
            coord: body.coord,
            url: body.url,
            userId: decodeToken(body.token).id,
        }

        console.log(newSpot)
        await SpotSchema.SpotModel.create(newSpot);
        return {message: "User created"};
    }
    catch (e){
        throw({'error': e});
    }
}

export async function getSpotDataByName(req) {
    const name = req.params['name'];
    const filter = {name: name}
    try {
        let spot = await SpotSchema.SpotModel.findOne(filter);
        if (spot) {
            return(spot);
        } else {
            throw("No such spot");
        }
    }
    catch (e) {
        throw(e);
    }
}

export async function getSpotDataById(req) {
    const id = req.params['id'];
    const filter = {_id: id}
    try {
        let spot = await SpotSchema.SpotModel.findOne(filter);
        if (spot) {
            return(spot);
        } else {
            throw("No such spot");
        }
    }
    catch (e) {
        throw(e);
    }
}

export async function getSpotsByRegion(req) {
    const region = req.params['region'];
    const filter = {region: region}
    try {
        let spot = await SpotSchema.SpotModel.find(filter);
        if (!spot) {
            throw("No such spot");
        }
        return(spot);
    }
    catch (e) {
        throw(e);
    }
}

export async function getAllSpot(req) {
    try {
        let spot = await SpotSchema.SpotModel.find();
        if (!spot) {
            throw("No such spot");
        }
        return(spot);
    }
    catch (e) {
        throw(e);
    }
}