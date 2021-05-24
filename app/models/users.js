const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10; //salt가 몇자리인지 정함
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(200),
      },
      lifeStyle: {
        type: Sequelize.STRING(50),
      },
      journeyType: {
        type: Sequelize.STRING(50),
      },
      image: {
        type: Sequelize.STRING(200),
        defaultValue: `/image/profile/default.png`
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: function (user, options) {
          return new Promise((resolve, reject) => {
            //promise 사용
            bcrypt.hash(user.password, saltRounds, (err, data) => {
              //암호화할 평문, salt, callback
              if (err) reject(err);
              user.password = data;
              resolve();
            });
          });
        },
      },
    }
  );


  Users.prototype.comparePassword = function (plainPassword, cb) {
      //제공된 패스워드와 암호화된 패스워드 일치하는지 확인하기
      //받아온 패스워드를 함호화해서 저장된 패스워드와 비교

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) {
          return cb(err, false)
      }
      return cb(null, isMatch)
    });
  };

  Users.prototype.generateToken = function (cb) {
    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(this.id, "secretToken");
    /* 사용자 토큰 업데이트 */
    // var user = this;
    // user.token = token;
    // user.save(function(err, user){
    //     if(err){
    //         return cb(err)
    //     }
    //     return cb(null, user)
    // })
    //   //
    return cb(null, this);
  };

  Users.findByToken = function (token, cb) {
    //토큰을 decode
    jwt.verify(token, "secretToken", function (err, decode) {
      //유저 아이디를 이용해서 유저를 찾은 다음에
      //클라이언트에서 가져온 token과 DB에 저장된 토큰이 일치 하는지 확인
      Users.findOne({ where: { id: decode, token: token } })
        .then((userInfo) => {
          cb(null, userInfo);
        })
        .catch((err) => {
          return cb(err);
        });
    });
  };

  return Users;
};
