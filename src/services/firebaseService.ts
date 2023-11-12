import firebase from "../firebase/firebase";
import { getUuid } from "../utils/getUuid";
import { imageToBlob } from "../utils/imageToBlob";

const uploadImage = async (req: { imageUrl: string }): Promise<string> => {
  const { imageUrl } = req;

  const res = await fetch(imageUrl);

  const arrayBuffer = await res.arrayBuffer();

  const imageProduct = `${getUuid()}.webp`;

  const resultBlob = await imageToBlob(arrayBuffer, 250);

  await firebase.uploadImage(resultBlob, imageProduct).catch((err) => {
    throw err;
  });

  const productImageURL = await firebase.getImageURL(imageProduct).catch((err) => {
    throw err;
  });

  return productImageURL;
};

export default { uploadImage };
