const db = require("../models");
const Places = db.places;
const path = require("path");
let currentDate = new Date()

exports.placeUpload = async (req, res) => {

    let imagePath = '';
    if(!req.file.filename) {
        imagePath = "/image/place/default.png";
    }
    else {
        imagePath = `/image/place/${req.file.filename}`;
    }

    const place = {
        placeName: req.body.placeName,
        pinTime: req.body.pinTime,
        journeysId: req.body.journeysId,
        category: req.body.category,
        note: req.body.note,
        image: imagePath,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        status: req.body.status,
        userId: req.body.userId,
        userName: req.body.userName,
    };

    try {
        const placeCreate = await Places.create(place)
        return res.status(200).json({ uploadSuccess: true, place: placeCreate })
    } catch (err) {
        console.log("place 업로드에 에러가 발생했습니다 : ", err);
        return "Unknown";
    }

}


exports.placeUpdate = async (req, res) => {

    let imagePath = '';
    if(!req.file.filename) {
        imagePath = "/image/place/default.png";
    }
    else {
        imagePath = `/image/place/${req.file.filename}`;
    }

    try {
        const _placeUpdate = await Places.update(
            {
                placeName: req.body.placeName,
                pinTime: req.body.pinTime,
                journeysId: req.body.journeysId,
                category: req.body.category,
                note: req.body.note,
                image: imagePath,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                status: req.body.status,
                userId: req.body.userId,
                userName: req.body.userName,
            },
            {where: {id: res.req.body.id}}
        )
        return res.status(200).json({ updateSuccess: true})
    } catch (err) {
        console.log("place 업데이트에 에러가 발생했습니다 : ", err);
        return "Unknown";
    }
}





exports.allPlaces = (req, res) => {
    Places.findAll().then((jourInfo) => {
        return res.status(200).send(jourInfo);
    }).catch((err) => {
        return res.status(400).send(err);
    })
}



exports.placesByJour = (req, res) => {

    const jId = req.params.journeysId
    Places.findAll({
        where: {journeysId: parseInt(jId)},
        // limit: 1000,
        order: [["id"]]
    }).then((jourInfo) => {
        return res.status(200).send(jourInfo);
    }).catch((err) => {
        return res.status(400).send(err);
    })

}

