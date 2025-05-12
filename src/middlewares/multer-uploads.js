import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const MIMETYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf" 
];

const MAX_SIZE = 500000000; 

const createMulterConfig = (destinationFolder) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const fullPath = join(CURRENT_DIR, destinationFolder);
        req.filePath = fullPath;
        cb(null, fullPath);
      },
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Formato no permitido. Tipos aceptados: ${MIMETYPES.join(", ")}`));
      }
    },
    limits: {
      fileSize: MAX_SIZE,
    },
  });
};

export const uploadFiles = createMulterConfig("../../public/uploads/files"); 