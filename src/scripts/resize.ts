import sharp from 'sharp';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildLogger } from '../plugins/logger.plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = resolve(__dirname, '../assets/images');
const logger = buildLogger('compress.js');

const imageSizes = [
  { name: 'desktop', size: 1600 },
  { name: 'laptop', size: 1024 },
  { name: 'tablet', size: 768 },
  { name: 'mobile', size: 320 },
];

readdirSync(directory).forEach(async (file: string) => {
  if (['mobile', 'tablet', 'laptop', 'desktop'].includes(file)) return;

  try {
    const image = sharp(`${directory}/${file}`);
    const name = file.split('.')[0];
    const { format, width } = await image.metadata();

    if (!format) return logger.log('No se pudo obtener el formato del archivo');

    for (let index = 0; index < imageSizes.length; index++) {
      if (width! < imageSizes[index].size) continue;

      image.resize(imageSizes[index].size).toFile(`${directory}/${name}-${imageSizes[index].name}.${format}`);
    }

    logger.log('Los archivos han sido redimensionados satisfactoriamente');
  } catch (error) {
    logger.log(file);
  }
});
