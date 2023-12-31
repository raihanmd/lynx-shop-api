//@ts-ignore
import axios from "axios";
//@ts-ignore
import sharp from "sharp";
//@ts-ignore
import { encode } from "blurhash";

export const convertToPNG = async (inputBlob: Buffer): Promise<Buffer> => {
  return sharp(inputBlob).ensureAlpha().toFormat("png").toBuffer();
};

export const encodeImageToBlurhash = async (path: string): Promise<string> => {
  const response = await axios.get(path, {
    responseType: "arraybuffer",
  });

  let imageData = response.data;

  imageData = await convertToPNG(imageData);
  const { data: pixels, info: metadata } = await sharp(imageData).raw().toBuffer({ resolveWithObject: true });
  const clamped = new Uint8ClampedArray(pixels);
  const encoded = encode(clamped, metadata.width, metadata.height, 4, 4);

  return encoded;
};
