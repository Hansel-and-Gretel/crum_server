const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.register = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  Users.create(user)
    .then((data) => {
      res.send({ message: "success" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = (req, res) => {
  //요청된 이메일을 데이터베이스에 있는지 찾는다
  Users.findOne({ where: { email: req.body.email } }).then((userInfo) => {
    //findOne promise임... 인스터스 생성 안돼서 함수 실행 안되는 거였음
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
    });

    userInfo.generateToken((err, tok) => {
      //토큰을 쿠키, 로컬스토리지, 아무튼 여러군데 저장 가능
      Users.update({ token: tok }, { where: { email: req.body.email } }) //토큰이 지정한 스트링 길이보다 훨씬 길어서 안되는 거였음
        .then(() => {
          //res.send({ message: "success" });
          res.cookie("x_auth", tok).status(200).json({
            loginSuccess: true,
            userId: userInfo.id,
          });
        })
        .catch((err) => {
          return res.status(400).send(err);
        });
    });
  });
};

exports.auth = (req, res) => {
  //여기까지 미들웨어를 통과해서 왔다 == Authentication이 true
  res.status(200).json({
    id: req.user.id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
};

exports.logout = (req, res) => {
  //req.user는 미들웨어에서 넣어준 것

  Users.update({ token: "" }, { where: { id: req.user.id } })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};
