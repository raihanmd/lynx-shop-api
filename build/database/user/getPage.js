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
exports.getPage = void 0;
const database_1 = require("../../config/database");
function getPage(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.con
            .query(`SELECT ud.image AS userImage,
              ud.banner AS userBanner,
              ud.bio AS userBio,
              ud.shop_description AS userShopDescription,
              AVG(r.rating) AS totalRating
        FROM user AS u
          RIGHT JOIN user_detail AS ud ON u.id = ud.id_user
						LEFT JOIN reviews AS r ON u.id = r.id_user
							WHERE u.user_name = '${userName}'
								GROUP BY u.id;`)
            // @ts-ignore
            .then(([rows]) => rows)
            .catch((err) => {
            throw err;
        });
    });
}
exports.getPage = getPage;
