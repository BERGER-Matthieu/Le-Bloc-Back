import * as BlocSchema from "../schema/bloc-schema.js";
import path from "path";
import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as user from "./user-model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createBloc(req) {
  console.log("🗻  : adding bloc");
  try {
    // username = user.getUser(req);
    const bloc = {
      spot: req.body.spot,
      cotation: req.body.username,
      description: req.body.description,
      url: req.body.url,
      img: req.body.img,
      position: req.body.position,
      user: "test",
    };
    // console.log(username);
    console.log(bloc);
    await BlocSchema.BlocModel.create(bloc);
    console.log("🗻  : bloc added");
    return { message: "Bloc created" };
  } catch (e) {
    throw { error: e };
  }
}

export async function getBlocDataByName(req) {
  try {
    const name = req.params["name"];
    const filter = { name: name };
    const bloc = await BlocSchema.BlocModel.findOne(filter);
    if (!bloc) {
      throw "no such bloc";
    }
    return bloc;
  } catch (e) {
    throw e;
  }
}

export async function getBlocImgByName(req) {
  const name = req.params["name"];
  console.log("🛠️  : Get bloc img by name");
  if (fs.existsSync(`../LBB-assets/blocs-img/${name}.png`)) {
    let imagePath = path.resolve(
      __dirname,
      "..",
      "..",
      "LBB-assets",
      "blocs-img",
      `${name}.png`,
    );
    console.log(imagePath);
    console.log("✅ : Img found\n");
    return imagePath;
  } else {
    throw "no such blocs";
  }
}

export async function getBlocsBySpot(req) {
  try {
    const spot = req.params["spot"];
    const filter = { spot: spot };
    const bloc = await BlocSchema.BlocModel.find(filter);
    if (!bloc) {
      throw "no such bloc";
    }
    return bloc;
  } catch (e) {
    throw e;
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
