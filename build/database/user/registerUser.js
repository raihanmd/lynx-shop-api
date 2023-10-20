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
import { ServiceError } from "../../error/serviceError.js";
export function registerUser({ userId, userName, userEmail, userOAuthId, userProvider, userImage }) {
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
                            throw new ServiceError(500, "Failed to insert data.");
                        }
                    }
                });
                yield connection.query(`INSERT INTO user_detail (id_user, image) VALUES ('${userId}', '${userImage}')`).then(([fields]) => {
                    //@ts-ignore
                    if (fields.affectedRows <= 0) {
                        //@ts-ignore
                        if (fields.affectedRows <= 0) {
                            throw new ServiceError(500, "Failed to insert data.");
                        }
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
