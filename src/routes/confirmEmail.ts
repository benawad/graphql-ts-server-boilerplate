import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../redis";
import * as path from "path";

export const confirmEmail = async (req: Request, res: Response) => {
  const { id, ext } = req.params;
  const userId = await redis.get(id);
  if (userId) {
    await confirm(userId, id)
    if (ext) {
      res.sendFile(path.join(__dirname, `../../static/verified.jpg`));
    } else {
      res.send("ok")
    }
  } else {
    if (ext) {
      res.sendStatus(404);
    } else {
      res.send("invalid");
    }
  }
};

const confirm = async (userId: string, redisId: any) => {
  await User.update({ id: userId }, { confirmed: true });
  await redis.del(redisId)
};