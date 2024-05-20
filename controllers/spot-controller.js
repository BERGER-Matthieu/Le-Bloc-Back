import * as spotModel from '../models/spot-model.js'

export function createSpot(req, res){
    try {
        const result = spotModel.createSpot(req);
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

export function getSpotDataByName(req, res){
    try {
        const result = spotModel.getSpotDataByName(req);
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

export function getSpotsByRegion(req, res){
    try {
        const result = spotModel.getSpotsByRegion(req);
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

export function getAllSpot(req, res){
    try {
        const result = spotModel.getAllSpot(req);
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