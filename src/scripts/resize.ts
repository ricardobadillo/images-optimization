import sharp from "sharp";
import * as fs from "fs";

const directory = "./src/assets/images";

fs.readdirSync(directory).forEach(async (file: string) => {
  try {
    const image = sharp(`${ directory }/${ file }`);
    const name = file.split(".")[0];
    const { format } = await image.metadata();

    if (!name.includes("small") && !name.includes("medium") && !name.includes("large") && (format === "png" || format === "webp")) {
      image.resize(450).toFile(`${ directory }/${ name }-small.${ format }`);
      image.resize(750).toFile(`${ directory }/${ name }-medium.${ format }`);
      image.resize(1800).toFile(`${ directory }/${ name }-large.${ format }`);
    }
  } catch (error) {
    console.log(file);
  }
});