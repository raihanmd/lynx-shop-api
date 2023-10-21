var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NodeCache from "node-cache";
const cache = new NodeCache();
//@ts-ignore
export default (duration) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "GET") {
        return next();
    }
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        //@ts-ignore
        res.send(JSON.parse(cachedResponse));
    }
    else {
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
});
