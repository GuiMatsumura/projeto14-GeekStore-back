import joi from "joi";
import bcrypt from "bcrypt";
import { db } from "../db/mongo.js";
import { v4 as uuid } from "uuid";

export async function postUsers(req, res) {
  const user = req.body;
  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.required(),
    cep: joi.number().required(),
    street: joi.required(),
    complement: joi.string(),
    district: joi.required(),
    city: joi.string().required(),
    uf: joi.string().min(2).max(2).required(),
  });

  const { error } = userSchema.validate(user, { abortEarly: true });

  if (error) {
    res.status(422).send(error.details);
    return;
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    const exist = await db.collection("users").findOne({ email: user.email });
    if (exist) {
      res.status(409).send();
      return;
    }
    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: passwordHash,
      cep: user.cep,
      street: user.street,
      complement: user.complement,
      district: user.district,
      city: user.city,
      uf: user.uf,
    });
    res.status(201).send("Conta cadastrada com sucesso!");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function postSession(req, res) {
  const user = req.body;
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const { error } = userSchema.validate(user);
  if (error) {
    res.status(422).send(error.message);
    return;
  }
  try {
    const findUser = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!findUser) {
      res.status(401).send("Email ou senha incorretos!");
      return;
    }

    const comparePassword = bcrypt.compareSync(
      user.password,
      findUser.password
    );
    if (!comparePassword) {
      res.status(401).send("Email ou senha incorretos!");
      return;
    }

    const token = uuid();
    await db.collection("session").insertOne({
      token,
      userId: findUser._id,
    });

    res.status(200).send({ token, name: findUser.name });
  } catch (err) {
    res.status(500).send(err);
    return;
  }
}

export async function getUser(req, res) {
  const { token } = req.headers;
  token.replace("Bearer ", "");
  try {
    const userId = await db.collection("session").findOne({ token: token });
    const user = await db.collection("users").findOne({ _id: userId });
    if (!user) {
      return res.sendStatus(401);
    }
    res.status(200).send({
      street: user.street,
      cep: user.cep,
      complement: user.complement,
      district: user.district,
      city: user.city,
      uf: user.uf,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
}
