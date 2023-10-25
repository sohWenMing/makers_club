const express = require('express');
const router = require(express.Router());
router.get("../helperfunctions/timeFunctions.js", (req, res) => {
    res.send("script has been requested");
});