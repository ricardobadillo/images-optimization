import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildLogger } from "../plugins/logger.plugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = resolve(__dirname, '../assets/images/*.{jpg,png}');
const logger = buildLogger('compress.js');

const pngPlugin = imageminPngquant({ quality: [ 0.8, 0.8 ] });
const webpPlugin = imageminWebp({ quality: 80 });

(async () => {
  const files = await imagemin([ directory ], {
    destination: `${__dirname}/../assets/images`,
    plugins: [ pngPlugin, webpPlugin ]
  });

  if (files.length > 0) {
    logger.log('Los archivos han sido comprimidos y convertidos a WebP');
  } else {
    logger.log('No se encontraron archivos para comprimir');
  }
})();