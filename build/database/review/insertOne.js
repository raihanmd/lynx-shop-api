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
exports.insertOne = void 0;
const database_1 = require("../../config/database");
const databaseError_1 = require("../../error/databaseError");
function insertOne({ reviewsId, userId, productId, reviewsRating, reviewsComment, createdAt }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                yield connection
                    .query(`INSERT INTO reviews
                (id, id_user, id_products, rating, comment, created_at)
                  VALUES ('${reviewsId}', '${userId}', '${productId}', ${reviewsRating},
                  '${reviewsComment}', ${createdAt})`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert data.");
                    }
                });
                yield connection.commit();
            }
            catch (err) {
                yield connection.rollback();
                throw err;
            }
        }))
            .catch((err) => {
            throw err;
        });
    });
}
exports.insertOne = insertOne;
