const express = require("express");

const router = express.Router();
const db = require(__dirname + "/../modules/tedious.js")
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM address_book";
    const result = await db.myExecSql(sql);
    res.json(result);
})

module.exports = router;