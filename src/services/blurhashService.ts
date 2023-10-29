import { ServiceError } from "../error/serviceError";
import { encodeImageToBlurhash } from "../utils/encodeImageToBlurhash";

const getBlurhash = async (req: { productImage: string }): Promise<string> => {
  const { productImage } = req;

  if (!productImage) {
    throw new ServiceError(403, "Invalid format body JSON.");
  }

  const blurhash = await encodeImageToBlurhash(productImage);

  return blurhash;
};

export default { getBlurhash };
