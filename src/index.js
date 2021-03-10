const express = require("express");
require("dotenv").config();
const fs = require("fs/promises")
const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));   //將public資料夾設為根目錄,底下的檔案都能從網址直接叫

app.get("/", (req, res) => {
    res.render("home", { name: "Leo" })
    // res.send(`<h2>Hello</h2>`);
})

app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html")
    res.status(404).send(error.toString());

})

app.listen(process.env.PORT || 3000, () => {

    console.log("Server starts:", new Date());
})