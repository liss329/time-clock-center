const express = require("express");
const router = express.Router();

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "user_data.sqlite3",
  },
  useNullAsDefault: true,
});
const Bookshelf = require("bookshelf")(knex);

const Attendance = Bookshelf.Model.extend({
  tableName: "attendance",
});

router.get("/", (req, res) => {
  if (!req.session.login) return res.redirect("/login");

  // 今月が何日まであるか
  const getLastDay = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const year = req.query.date
    ? req.query.date.split("-")[0]
    : req.query.year
      ? req.query.year
      : new Date().getFullYear();
  const month = req.query.date
    ? req.query.date.split("-")[1]
    : req.query.month
      ? req.query.month
      : new Date().getMonth() + 1;

  Attendance.where("uid", "=", req.session.login.uid)
    .where("year", "=", year)
    .where("month", "=", month)
    .orderBy("date", "ABC")
    .fetchAll()
    .then((collection) => {
      res.render("attendanceRecord", {
        title: "勤怠管理 | Time Clock Center",
        year: Number(year),
        month: Number(month),
        attendanceDate: collection.models, // array-like object
        lastDay: getLastDay(year, month),
      });
    });
});

module.exports = router;
