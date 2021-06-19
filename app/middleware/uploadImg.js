const multer = require("multer");
const path = require("path");

// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
};

let storageJourney = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/journey/");
    },
    filename: function(req, file, cb){
        cb(null, "JOURNEY-" + Date.now() + path.extname(file.originalname));
    }
});

let storagePlace = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/place/");
    },
    filename: function(req, file, cb){
        cb(null, "PLACE-" + Date.now() + path.extname(file.originalname));
    }
});

let storageProfile = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/profile/");
    },
    filename: function(req, file, cb){
        cb(null, "PROFILE-" + Date.now() + path.extname(file.originalname));
    }
});

exports.uploadJourneyImage = multer({ storage: storageJourney, fileFilter: imageFilter }).single(
    // 프론트에서 넘겨울 params key 값, 오른쪽 같이 넘겨줘야함-> {photo: binary}
    "image"
);
exports.uploadPlaceImage = multer({ storage: storagePlace, fileFilter: imageFilter }).single(
    "image"
);
exports.uploadProfileImage = multer({ storage: storageProfile, fileFilter: imageFilter }).single(
    "image"
);