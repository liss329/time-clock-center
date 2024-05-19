var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  if (!req.session.login) return res.redirect("/login");
  res.render("index", { title: "Time Clock Center" });
});

module.exports = router;
