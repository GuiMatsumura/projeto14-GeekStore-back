import { db } from "../db/mongo.js";

export async function getHardware(req, res) {
  try {
    const hardware = await db
      .collection("products")
      .find({ departament: "hardware" })
      .toArray();
    res.status(202).send(hardware);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getPromotion(request, response) {
  try {
    const object = await db
      .collection("products")
      .find({ promotion: true })
      .toArray();

    return response.status(202).send(object);
  } catch (error) {
    console.log(error);
    //INTERNAL SERVER ERROR
    return response.sendStatus(500);
  }
}

export async function getMonitor(req, res) {
  try {
    const monitor = await db
      .collection("products")
      .find({ departament: "monitor" })
      .toArray();
    res.status(202).send(monitor);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getJogos(req, res) {
  try {
    const jogos = await db
      .collection("products")
      .find({ departament: "jogos" })
      .toArray();
    res.status(202).send(jogos);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getPerifericos(req, res) {
  try {
    const perifericos = await db
      .collection("products")
      .find({ departament: "perifericos" })
      .toArray();
    res.status(202).send(perifericos);
  } catch (err) {
    return res.sendStatus(500);
  }
}
