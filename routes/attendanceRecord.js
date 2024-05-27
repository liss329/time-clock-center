const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.login) return res.redirect("/login");

  // 今月が何日まであるか
  const getLastDay = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const year = req.query.month
    ? req.query.month.split("-")[0]
    : new Date().getFullYear();
  const month = req.query.month
    ? req.query.month.split("-")[1]
    : new Date().getMonth() + 1;

  res.render("attendanceRecord", {
    title: "勤怠管理 | Time Clock Center",
    year: Number(year),
    month: Number(month),
    lastDay: getLastDay(year, month),
  });
});

module.exports = router;
