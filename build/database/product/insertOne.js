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
const serviceError_1 = require("../../error/serviceError");
function insertOne({ productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug, userId, createdAt, productImage, blurhash }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            //@ts-ignore
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [idCategory = rows] = yield connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
                if (idCategory.length <= 0) {
                    throw new serviceError_1.ServiceError(404, "Category not found.");
                }
                yield connection
                    .query(`INSERT INTO products 
                (id, id_user, id_categories,
                  name, slug, image, blurhash,
                  description, price, quantity,
                  weight, created_at)
                  VALUES ('${productId}', '${userId}', '${idCategory[0].id}', 
                          '${productName}', '${productSlug}', '${productImage}', 
                          '${blurhash}', '${productDescription}', ${productPrice}, 
                          ${productQuantity}, ${productWeight}, ${createdAt})`)
                    //@ts-ignore
                    .then(([fields]) => __awaiter(this, void 0, void 0, function* () {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to insert product.");
                    }
                }));
                yield connection.commit();
            }
            catch (err) {
                yield connection.rollback();
                throw err;
            }
        }))
            //@ts-ignore
            .catch((err) => {
            throw err;
        });
    });
}
exports.insertOne = insertOne;
