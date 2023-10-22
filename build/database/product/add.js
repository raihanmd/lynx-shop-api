var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { con } from "../../config/database.js";
import { DatabaseError } from "../../error/databaseError.js";
import { ServiceError } from "../../error/serviceError.js";
export function insertOne({ productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight, productSlug, userId, createdAt, productImage, blurhash }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [idCategory = rows] = yield connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
                if (idCategory.length <= 0) {
                    throw new ServiceError(404, "Category not found.");
                }
                yield connection
                    .query(`INSERT INTO products 
                (id, id_user, id_categories, name, slug, image, blurhash, description, price, quantity, weight, created_at)
                  VALUES ('${productId}', '${userId}', '${idCategory[0].id}', 
                    '${productName}', '${productSlug}', '${productImage}', '${blurhash}', '${productDescription}', ${productPrice}, ${productQuantity}, ${productWeight}, ${createdAt})`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new DatabaseError("failed to insert data.");
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
