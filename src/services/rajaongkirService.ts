import RajaOngkir from "../config/rajaongkir";
import { ICOSTRajaongkirBody } from "../interfaces/rajaongkir/IRajaongkirBody";

const getCities = async (req: { provinceId: string } | any): Promise<string> => {
  const {
    rajaongkir: { results },
  } = await RajaOngkir.getCities();

  const filteredCity = results.filter((city: { province_id: string }) => city?.province_id === req.provinceId);

  return filteredCity;
};

const getProvinces = async (req: { provinceId: string } | any): Promise<[]> => {
  const {
    rajaongkir: { results },
  } = await RajaOngkir.getProvinces();

  return results;
};

const getCost = async (req: ICOSTRajaongkirBody): Promise<object> => {
  const { origin, destination, weight } = req;

  const [{ costs: JNE }] = (await RajaOngkir.getJNECost({ origin, destination, weight })).rajaongkir.results;
  const [{ costs: TIKI }] = (await RajaOngkir.getTIKICost({ origin, destination, weight })).rajaongkir.results;
  const [{ costs: POS }] = (await RajaOngkir.getPOSCost({ origin, destination, weight })).rajaongkir.results;

  const costs: any = {};

  if (JNE.length > 0) costs.JNE = JNE;
  if (TIKI.length > 0) costs.TIKI = TIKI;
  if (POS.length > 0) costs.POS = POS;

  return costs;
};

export default { getCities, getCost, getProvinces };
