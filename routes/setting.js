const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.login) return res.redirect("/login");
  res.render("setting", { title: "設定 | Time Clock Center" });
});

module.exports = router;
