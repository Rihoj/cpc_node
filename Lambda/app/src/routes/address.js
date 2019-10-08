import express from "express";
// import Address from "../models/address"

var router = express.Router();


/* GET users listing. */
router.get("/", function(req, res) {
  res.json("response");
});

export default router
