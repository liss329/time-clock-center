var express = require("express");
var router = express.Router();
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "user_data.sqlite3",
  },
  useNullAsDefault: true,
});
const Bookshelf = require("bookshelf")(knex);

const Users = Bookshelf.Model.extend({
  tableName: "users",
});

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.login) return res.redirect("/");
  res.render("login", { title: "ログイン | Time Clock Center" });
});

router.post("/", (req, res) => {
  console.log(`email:${req.body.email}, password:${req.body.password}`);
  Users.query({
    where: { email: req.body.email },
    andWhere: { password: req.body.password },
  })
    .fetch()
    .then((model) => {
      if (model === null) {
        // 入力したemail,passwordがデータベースと不一致の場合
        console.log(`emailもしくはpasswordが間違えています`);
        return res.render("login", { title: "Time Clock Center" });
      }
      // 入力したemail,passwordがデータベースと一致した場合
      // ログイン処理
      console.log(model.attributes);
      req.session.login = model.attributes;
      console.log(`sessionID: ${req.session.login.id}`);
      res.redirect("/");
    });
});

module.exports = router;
