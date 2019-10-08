import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.json({title: "Express" });
});

export default router
