import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";

const directory = "./src/assets/images/*.{png}";

const pngPlugin = imageminPngquant({ quality: [ 0.8, 0.8 ] });
const webpPlugin = imageminWebp({ quality: 80 });

(async () => {
  const files = await imagemin([directory], {
    destination: "./src/assets/images/",
    plugins: [ pngPlugin, webpPlugin ]
  });
  console.log(files);
})();
