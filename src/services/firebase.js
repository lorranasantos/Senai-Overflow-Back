var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-key.json");

const BUCKET = "senai-overflow-36f5b.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;
  const fileName = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(fileName);
  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });
  stream.on("error", (e) => {
    console.error(e);
  });
  stream.on("finish", async () => {
    // Tornar o arquivo público
    await file.makePublic();

    // obter o url público
    req.file.firebaseUrl = `https://storage.google.com/${BUCKET}/${fileName}`;
  });
  stream.end(image.buffer);
};

module.exports = uploadImage;
