const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.login) return res.redirect("/login");
  res.render("attendanceRecord", { title: "勤怠管理 | Time Clock Center" });
});

module.exports = router;
