import * as UserSchema from '../schema/user-schema.js';
import * as lbBrain from '../lbb-brain.js';
import crypto from 'crypto';

export async function createUser(req){
    const hash = crypto.createHash('sha256');
    console.log("🛠️  : create user");
    try {
        lbBrain.checkPassword(req.body.password, req.body.confirm_password);
        hash.update(req.body.password);
        const user = {
            username: req.body.username,
            password: hash.digest('hex'),
            mail: req.body.mail,
        }
        console.log(user)
        await UserSchema.UserModel.create(user);
        return {message: "User created", token: user.jwt};
    }
    catch (e){
        throw({'error': e});
    }
}

export async function loginUser(req){
    const hash = crypto.createHash('sha256');
    console.log("🛠️  : login user");
    try {
        const username = req.body.username;
        hash.update(req.body.password);
        const filter = {username: username, password: hash.digest('hex')}
        const user = await UserSchema.UserModel.findOne(filter);
        if (!user) {
            throw('no such user');
        }
        const token = lbBrain.createAccessToken({"id": user._id , "mail": user.mail, "username": user.username})
        return(token);
    }
    catch (e) {
        throw(e)
    } 
}

export async function getUserById(req){
    console.log("🛠️  : get user");
    try {
        const id = req.body._id;
        const filter = {_id: id}
        const user = await UserSchema.UserModel.findOne(filter);
        console.log(user)
        if (!user) {
            throw('no such user');
        }
        return(user);
    }
    catch (e) {
        console.log(e)
        throw(e)
    } 
}

export async function updateUser(req){
    const hash = crypto.createHash('sha256');
    console.log("🛠️  : update user");
    try {
        if(req.body.password && req.body.confirm_password) {
            lbBrain.checkPassword(req.body.password, req.body.confirm_password);
            hash.update(req.body.password);
        }
        const token = lbBrain.createAccessToken({username: req.body.username, mail: req.body.mail}, jwtKey)
        const user = {
            username: req.body.username,
            password: (req.body.password && req.body.confirm_password) ? hash.digest('hex') : req.body.old_password,
            mail: req.body.mail,
            jwt: token
        }
        const filter = {
            _id: req.body._id
        }
        console.log(user)
        await UserSchema.UserModel.findOneAndUpdate(filter, user);
        return {message: "User updated", token: user.jwt};
    }
    catch (e){
        throw({'error': e});
    }
}

export async function deleteUser(req){
    console.log("🛠️  : delete user");
    try {
        const id = req.body._id;
        const filter = {_id: id}
        const user = await UserSchema.UserModel.findOneAndDelete(filter);
        if (!user) {
            throw('no such user');
        }
        return(user);
    }
    catch (e) {
        console.log(e)
        throw(e)
    } 
}