import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../config/firebase";

const deleteImage = async (imageName: string) => {
  return await deleteObject(ref(storage, `images/${imageName}`)).catch((err) => {
    throw err;
  });
};

const getImageURL = async (imageName: string) => {
  return await getDownloadURL(ref(storage, `images/${imageName}`)).catch((err) => {
    throw err;
  });
};

const uploadImage = async (blobImage: Blob, imageProduct: string) => {
  try {
    const imageRef = ref(storage, `images/${imageProduct}`);
    await uploadBytes(imageRef, blobImage, { contentType: "image/webp" }).catch((err) => {
      throw err;
    });
  } catch (error) {
    throw error;
  }
};

export default { deleteImage, getImageURL, uploadImage };
