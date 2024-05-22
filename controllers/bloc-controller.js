import * as blocModel from '../models/bloc-model.js'
import multer from 'multer';

const upload = multer();

export function createBloc(req, res){
    upload.array()(req, res, (err) => {
        if (err) {
            res.status(500).send({'error': err})
        }

        try {
            console.log(req)
            const result = blocModel.createBloc(req);
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
    })
}

export function getBlocDataByName(req, res){
    try {
        const result = blocModel.getBlocDataByName(req);
        result.then((content) => {
            res.status(200).send(content)
        })
        .catch((e) => {
            res.status(500).send({'error': e})
        })
    }
    catch (error) {
        res.status(500).send({'error': e})
    }
}

export function getBlocImgByName(req, res) {
    try {
        const result = blocModel.getBlocImgByName(req);
        result.then((content) => {
            res.status(200).sendFile(content)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({'error': e})
        })
    }
    catch (e) {
        res.status(500).send({'error': e})
    }
}

export function getBlocImgById(req, res) {
    try {
        const result = blocModel.getBlocImgById(req);
        result.then((content) => {
            res.status(200).sendFile(content)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({'error': e})
        })
    }
    catch (e) {
        res.status(500).send({'error': e})
    }
}

export function getBlocsBySpot(req, res) {
    try {
        const result = blocModel.getBlocsBySpot(req);
        result.then((content) => {
            console.log(content)
            res.status(200).send(content)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({'error': e})
        })
    }
    catch (e) {
        res.status(500).send({'error': e})
    }
}

export function getBlocsByUser(req, res) {
    try {
        const result = blocModel.getBlocsByUser(req);
        result.then((content) => {
            console.log(content)
            res.status(200).send(content)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({'error': e})
        })
    }
    catch (e) {
        res.status(500).send({'error': e})
    }
}

export function getAllBloc(req, res) {
    try {
        const result = blocModel.getAllBloc(req);
        result.then((content) => {
            console.log(content)
            res.status(200).send(content)
        })
        .catch((e) => {
            console.log(e)
            res.status(500).send({'error': e})
        })
    }
    catch (e) {
        res.status(500).send({'error': e})
    }
}