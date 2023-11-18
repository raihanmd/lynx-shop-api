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
const rajaongkir_1 = __importDefault(require("../config/rajaongkir"));
const getCities = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { rajaongkir: { results }, } = yield rajaongkir_1.default.getCities();
    const filteredCity = results.filter((city) => (city === null || city === void 0 ? void 0 : city.province_id) === req.provinceId);
    return filteredCity;
});
const getProvinces = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { rajaongkir: { results }, } = yield rajaongkir_1.default.getProvinces();
    return results;
});
const getCost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination, weight } = req;
    const [{ costs: JNE }] = (yield rajaongkir_1.default.getJNECost({ origin, destination, weight })).rajaongkir.results;
    const [{ costs: TIKI }] = (yield rajaongkir_1.default.getTIKICost({ origin, destination, weight })).rajaongkir.results;
    const [{ costs: POS }] = (yield rajaongkir_1.default.getPOSCost({ origin, destination, weight })).rajaongkir.results;
    const costs = {};
    if (JNE.length > 0)
        costs.JNE = JNE;
    if (TIKI.length > 0)
        costs.TIKI = TIKI;
    if (POS.length > 0)
        costs.POS = POS;
    return costs;
});
exports.default = { getCities, getCost, getProvinces };
