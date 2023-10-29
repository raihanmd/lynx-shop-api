import { NextFunction, Request, Response } from "express";
//@ts-ignore
import NodeCache from "node-cache";

const cache = new NodeCache();

//@ts-ignore
export default (duration) => async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") {
    return next();
  }
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    //@ts-ignore
    res.send(JSON.parse(cachedResponse));
  } else {
    //@ts-ignore
    res.originalSend = res.send;
    //@ts-ignore
    res.send = (body) => {
      //@ts-ignore
      res.originalSend(body);
      //@ts-ignore
      cache.set(key, body, duration);
    };
    next();
  }
};
