const db = require("../models");
const Journeys = db.journeys;
const Follows = db.follows;
const path = require("path");
let currentDate = new Date()

exports.journeyUpload = async (req, res) => {

        var imagePath = '';
        if(!req.file.filename) {
            imagePath = "/image/journey/default.png";
        }
        else {
            imagePath = `/image/journey/${req.file.filename}`;
        }

        // journey 구성
        const journey = {
            journeyName: req.body.journeyName,
            type: req.body.type,
            accompany: req.body.accompany,
            pinFrequency: req.body.pinFrequency,
            summary: req.body.summary,
            image: imagePath,
            status: req.body.status,
            sharedFlag: req.body.sharedFlag,
            userId: req.body.userId,
            userName: req.body.userName,
        };


        // journey create
        try {
            const journeyCreate = await Journeys.create(journey)
            return res.status(200).json({ uploadSuccess: true, journey: journey })
        } catch (err) {
            console.log("Journey 업로드에 에러가 발생했습니다 : ", err);
            return "Unknown";
        }

}

exports.publicJour = (req, res) => {
    Journeys.findAll({
        where: {sharedFlag: true},
        limit: 2,
        order: [["id", "DESC"]]
    }).then((jourInfo) => {
        return res.status(200).send(jourInfo);
    })
    .catch((err) => {return res.status(400).send(err);})
}

exports.jourDetail = (req, res) => {
    Journeys.findByPk(req.params.id).then((jourInfo) => {
        return res.status(200).send(jourInfo);
    })
    .catch((err) => {return res.status(400).send({
        message: err.message || "Some error occurred while searching journey detail.",
        });
    })
}

exports.myJourney = (req, res) => {
    Journeys.findAll({where: {userId: req.params.id}}).then((jourInfo) => {
        return res.status(200).send(jourInfo);
    })
    .catch((err) => {return res.status(400).send(err);})
}

exports.otherJourney = (req, res) => {
    Journeys.findAll({where: {userId: req.params.id, sharedFlag: true}}).then((jourInfo) => {
        return res.status(200).send(jourInfo);
    })
    .catch((err) => {return res.status(400).send(err);})
}

exports.followJourney = (req, res) => {
    var followList = [];
    Follows.findAll({where: {userId: req.params.id}})
    .then((followInfo) => {
        followInfo.map((follow) => {
            followList.push(follow.followingId);
        });
        Journeys.findAll({where: {userId: followList, sharedFlag: true}}).then((jourInfo) => {
            return res.status(200).send(jourInfo);
        })
        .catch((err) => {return res.status(400).send(err);})
    })
    .catch((err) => {return res.status(400).send(err);})
}