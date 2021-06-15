const multer = require("multer");
const path = require("path");

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
};

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/journey/");
    },
    filename: function(req, file, cb){
        cb(null, "JOURNEY-" + Date.now() + path.extname(file.originalname));
    }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
    // 프론트에서 넘겨울 params key 값, 오른쪽 같이 넘겨줘야함-> {photo: binary}
    "image"
);
module.exports = uploadFile;