const Multer = require("multer");

const uploadQuestions = Multer({
    storage: Multer.memoryStorage(),
    
    fileFilter: (req, file, callback) =>{
        let allowTypes = ["image/png", "image/jpeg"];

        if(allowTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            callback(new Error("Tipo de arquivo inválido"));
        }
    },
    limits:{ fileSize: 1024 * 1024 * 2,} //máximo de 2Mb
});

module.exports = uploadQuestions.single("image");