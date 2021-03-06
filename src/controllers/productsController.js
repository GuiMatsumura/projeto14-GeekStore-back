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

export async function getProduct(req, res) {
  const { id } = req.body;
  try {
    const product = await db.collection("products").findOne({ id: id });
    console.log(product);
    res.status(202).send(product);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function postCart(req, res) {
  const ids = req.body;
  try {
    let cart = [];
    for (const product of ids) {
      const item = await db.collection("products").findOne({ id: product.id });
      cart.push(item);
    }
    res.status(202).send(cart);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function postOrders(req, res) {
  const ids = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const userSession = await db.collection("session").findOne({ token });

    if (!userSession) {
      res.sendStatus(401);
      return;
    }
    const userId = userSession.userId;
  } catch (error) {
    res.sendStatus(500);
  }
}
