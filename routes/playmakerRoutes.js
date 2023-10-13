const express = require('express');
const router = express.Router();

router.get("/" , (req, res) => {
    res.render("playmakers", {currentPage: "playmakers"})
})

module.exports = router;