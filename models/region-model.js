import * as RegionSchema from '../schema/region-schema.js'

export async function getRegionDataByName(req) {
    const name = req.params['name'];
    const filter = {name: name}
    try {
        let region = await RegionSchema.RegionModel.findOne(filter);
        if (region) {
            return(region);
        } else {
            throw("No such region");
        }
    }
    catch(e) {
        throw(e);
    }
}

export async function getAllRegion(req) {
    try {
        let region = await RegionSchema.RegionModel.find();
        if (region) {
            return(region);
        } else {
            throw("No such region");
        }
    }
    catch(e) {
        throw(e);
    }
}