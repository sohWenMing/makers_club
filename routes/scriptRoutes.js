const express = require('express');
const router = require(express.Router());
router.get("../helperfunctions/timeFunctions.js", (req, res) => {
    res.setHeader("Content-Type", 'application/javascript');
    res.sendFile()
});,