const express = require("express");
const router = express.Router(); // returns the Router object, which has methods

router.get('/test', (req, res) => {
    res.send("getting something from test")
});

module.exports = router;