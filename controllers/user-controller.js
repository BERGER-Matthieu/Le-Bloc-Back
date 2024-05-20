import * as userModel from '../models/user-model.js'

export function createUser(req, res){
    try {
        const result = userModel.createUser(req);
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

export function loginUser(req, res){
    try {
        const result = userModel.loginUser(req);
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

export function getUserById(req, res){
    try {
        const result = userModel.getUserById(req);
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

export function updateUser(req, res){
    try {
        const result = userModel.updateUser(req);
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

export function deleteUser(req, res){
    try {
        const result = userModel.deleteUser(req);
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