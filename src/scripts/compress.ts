import imagemin from 'imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildLogger } from '../plugins/logger.plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = resolve(__dirname, '../assets/images/*.{jpg,jpeg,png}');
const logger = buildLogger('compress.js');

const jpgPlugin = imageminJpegRecompress({ quality: 'high' });
const pngPlugin = imageminPngquant({ quality: [0.8, 0.8] });
const webpPlugin = imageminWebp({ quality: 80 });

(async () => {
  const files = await imagemin([directory], {
    destination: resolve(__dirname, '../assets/images/'),
    plugins: [jpgPlugin, pngPlugin, webpPlugin],
  });

  if (files.length > 0) {
    return logger.log('Los archivos han sido comprimidos y convertidos a WebP');
  } else {
    return logger.log('No se encontraron archivos para comprimir');
  }
})();
