module.exports = (app) => {
  const user = require("../controllers/usercontroller.js");
  const journey = require("../controllers/journeycontroller.js");
  const place = require("../controllers/placecontroller.js");
  const follow = require("../controllers/followcontroller.js");
  const scrap = require("../controllers/scrapcontroller.js");
  const { auth } = require("../middleware/auth.js");
  var router = require("express").Router();
  const uploadImg = require("../middleware/uploadImg")

  /** USER **/
  router.post("/api/user/register", user.register); //

  router.post("/api/user/login", user.login); //

  router.post("/api/user/profile-upload", uploadImg.uploadProfileImage, user.profileUpload);

  router.post("/api/user/update", user.userStyleUpdate);

  // router.post("/api/user/profile", user.profileEdit);

  router.get("/api/user/user-info/:id", user.getUserInfo);

  router.get("/api/user/auth", auth, user.auth); //authentication

  router.get("/api/user/logout", auth, user.logout); //

  /** JOURNEY **/
  // 전체 - 최근 등록순
  router.get("/api/journey/main", journey.publicJour);
  // 스타일 별
  router.get("/api/journey/style/:type", journey.jourByStyle);
  // 동행 타입으로
  router.get("/api/journey/accompany/:accompany", journey.jourByAccompany);

  router.get("/api/journey/follow-journey/:id", journey.followJourney);

  router.get("/api/journey/mypage/:id", journey.myJourney);

  router.get("/api/journey/otherpage/:id", journey.otherJourney);

  router.get("/api/journey/detail/:id", journey.jourDetail);

  router.post("/api/journey/upload", uploadImg.uploadJourneyImage, journey.journeyUpload );


  /** PLACE **/
  router.post("/api/place/upload", uploadImg.uploadPlaceImage, place.placeUpload );

  router.post("/api/place/update", uploadImg.uploadPlaceImage, place.placeUpdate );

  router.get("/api/place/list", place.allPlaces );

  router.get("/api/place/journey/:journeysId", place.placesByJour );



  /** FOLLOW **/
  router.post("/api/follow/follow-check", follow.followCheck);

  router.post("/api/follow/set-follow", follow.setFollow);

  router.post("/api/follow/unfollow", follow.unfollow);

  router.get("/api/follow/get-following-list/:id", follow.getFollowingList);

  router.get("/api/follow/get-follower-list/:id", follow.getFollowerList);

  router.get("/api/follow/count-following/:id", follow.countFollowing);

  router.get("/api/follow/count-follower/:id", follow.countFollower);


  /** SCRAP **/
  router.post("/api/scrap/scrap-check", scrap.scrapCheck);

  router.post("/api/scrap/set-scrap", scrap.setScrap);

  router.post("/api/scrap/unscrap", scrap.unScrap);

  router.get("/api/scrap/get-scrap-list/:id", scrap.getScrapList);

  app.use("/", router);
};