import * as regionModel from '../models/region-model.js'

export function getRegionDataByName(req, res) {
    try {
        const result = regionModel.getRegionDataByName(req);
        result.then((result) => {
            res.status(200).send(result)
        })
        .catch((e) => {
            res.status(500).send({'error' : e})
        })
    }
    catch (e) {
        res.status(500).send({'error' : e})
    }
}

export function getAllRegion(req, res) {
    try {
        const result = regionModel.getAllRegion(req);
        result.then((result) => {
            res.status(200).send(result)
        })
        .catch((e) => {
            res.status(500).send({'error' : e})
        })
    }
    catch (e) {
        res.status(500).send({'error' : e})
    }
}