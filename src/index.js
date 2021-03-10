const express = require("express");
require("dotenv").config();
const fs = require("fs/promises")
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));         //用form url傳
app.use(express.json());                                  //用json傳



app.use(express.static("public"));   //將public資料夾設為根目錄,底下的檔案都能從網址直接叫
//用use是把REST方法都包含在內(GET,POST...)



app.get("/", (req, res) => {
    res.render("home", { name: "Leo" })
})



app.get("/json-sales", (req, res) => {                        //第一個斜線後代表網址         
    const sales = require(__dirname + "/../data/json-sales"); //callback去data/json-sales抓資料
    res.render("json-sales", { sales })                       //去json-sales.ejs,把抓回來的資料傳過去
})




app.get("/try-qs", (req, res) => {                            //query string
    res.json(req.query);
})




// const urlencodedParser = express.urlencoded({ extended: false });     //Middleware
// app.post("/try-post", urlencodedParser, (req, res) => {

//     res.json(req.body);
// })


app.post("/try-post", (req, res) => {
    res.json(req.body);
})




app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html")
    res.status(404).send(error.toString());
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server starts:", new Date());
})