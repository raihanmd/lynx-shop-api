"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const database_1 = require("../../config/database");
function get(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .query(`SELECT   r.rating AS reviewsRating,
                r.comment AS reviewsComment,
                u.user_name AS writtenBy
          FROM reviews AS r 
              INNER JOIN user AS u ON (u.id = r.id_user)
                INNER JOIN products AS p ON (p.id = r.id_products)  
                  WHERE p.id = ${productId}
                    LIMIT 10`)
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
exports.get = get;
