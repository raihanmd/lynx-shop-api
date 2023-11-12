import sharp from "sharp";

export async function imageToBlob(arrayBuffer: ArrayBuffer, maxSize: number) {
  const image = sharp(arrayBuffer);

  const metadata = await image.metadata();

  //@ts-ignore
  const imageRatio = metadata.width / metadata.height;

  let targetWidth, targetHeight;
  if (imageRatio >= 1) {
    //@ts-ignore
    targetWidth = Math.min(metadata.width, maxSize);
    targetHeight = Math.round(targetWidth / imageRatio);
  } else {
    //@ts-ignore
    targetHeight = Math.min(metadata.height, maxSize);
    targetWidth = Math.round(targetHeight * imageRatio);
  }

  const resizedImageBuffer = await image.resize(targetWidth, targetHeight, { fit: "inside" }).toBuffer();

  const webpBuffer = await sharp(resizedImageBuffer).toFormat("webp").toBuffer();

  const webpBlob = new Blob([webpBuffer], { type: "image/webp" });

  return webpBlob;
}
