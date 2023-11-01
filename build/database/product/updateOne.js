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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = void 0;
//@ts-ignore
const slugify_1 = __importDefault(require("slugify"));
const database_1 = require("../../config/database");
const databaseError_1 = require("../../error/databaseError");
const serviceError_1 = require("../../error/serviceError");
function updateOne({ userId, productId, productName, productPrice, productCategory, productDescription, productQuantity, productWeight }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                //@ts-ignore
                const [idCategory = rows] = yield connection.query(`SELECT id FROM categories WHERE name = '${productCategory}'`);
                if (idCategory.length <= 0) {
                    throw new serviceError_1.ServiceError(404, "Category not found.");
                }
                //@ts-ignore
                const productSlug = (0, slugify_1.default)(productName);
                yield connection
                    .query(`UPDATE products 
                SET id_categories = '${idCategory[0].id}', 
                    name = '${productName}', 
                    slug = '${productSlug}',
                    description = '${productDescription}', 
                    price = ${productPrice},
                    quantity = ${productQuantity},
                    weight = ${productWeight}
                  WHERE id = '${productId}' AND id_user = '${userId}'`)
                    .then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        throw new databaseError_1.DatabaseError("Failed to update product.");
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
exports.updateOne = updateOne;
