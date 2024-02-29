import multer from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tempDir = join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir
});

const upload = multer({storage: multerConfig});

export {upload};