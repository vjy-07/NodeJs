const express = require("express");
const {
  handleGenNewShortUrl,
  handleGetShortUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenNewShortUrl);

router.get("/:shortId", handleGetShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
