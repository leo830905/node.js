const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const extMAP =
{
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
};

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../../public/img-upload");

        },
        filename: (req, file, cb) => {
            let ext = extMAP[file.mimetype];
            cb(null, uuidv4() + ext);
        }

    });

const filefilter = (req, file, cb) => {
    cb(null, !!extMAP[file.mimetype])
}

module.exports = multer({ storage, filefilter });