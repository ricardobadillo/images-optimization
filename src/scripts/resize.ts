import sharp from 'sharp';
import { readdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { buildLogger } from '../plugins/logger.plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directory = resolve(__dirname, '../assets/images');
const logger = buildLogger('compress.js');

readdirSync(directory).forEach(async (file: string) => {

  if (file.includes('small') || file.includes('medium') || file.includes('large')) return;

  try {
    const image = sharp(`${ directory }/${ file }`);
    const name = file.split('.')[0];
    const { format } = await image.metadata();

    if (!name.includes('small') && !name.includes('medium') && !name.includes('large') && (format === 'png' || format === 'webp')) {
      image.resize(450).toFile(`${ directory }/${ name }-small.${ format }`);
      image.resize(750).toFile(`${ directory }/${ name }-medium.${ format }`);
      image.resize(1800).toFile(`${ directory }/${ name }-large.${ format }`);
    }

    logger.log('Los archivos han sido redimensionados satisfactoriamente');
  } catch (error) {
    logger.log(file);
  }
});