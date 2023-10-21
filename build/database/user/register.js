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
export function register({ userId, userName, userEmail, userOAuthId, userProvider, userImage }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield con
            .getConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            connection.beginTransaction();
            try {
                yield connection.query(`INSERT INTO user (id, oauth_id, user_name, email, provider) VALUES ('${userId}', '${userOAuthId}', '${userName}', '${userEmail}', '${userProvider}')`).then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        //@ts-ignore
                        if (fields.affectedRows <= 0) {
                            throw new DatabaseError("Failed to insert data.");
                        }
                    }
                });
                yield connection.query(`INSERT INTO user_detail (id_user, image) VALUES ('${userId}', '${userImage}')`).then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        //@ts-ignore
                        if (fields.affectedRows <= 0) {
                            throw new DatabaseError("Failed to insert data.");
                        }
                    }
                });
                yield connection.query(`SELECT user_name AS userName FROM user WHERE id = ${userId}`).then(([rows]) => { var _a; return (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.userName; });
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
