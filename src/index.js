const express = require("express");
require("dotenv").config();
const fs = require("fs/promises")
const app = express();

const multer = require("multer");
const upload = require(__dirname + "/modules/upload.module.js")



app.set("view engine", "ejs");

const session = require("express-session");
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "fwgrjekivgor;lejvfiore",
    cookie: {
        maxAge: 1200000
    }

}))

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
    req.body.comefrom = "/try-post";
    req.body.clientMethod = "POST";
    // res.end(JSON.stringify(req.body));            //res.end(字串)
    res.json(req.body);
})

app.put("/try-post", (req, res) => {
    req.body.comefrom = "/try-post";
    req.body.clientMethod = "PUT";
    res.json(req.body);
})

app.delete("/try-post", (req, res) => {
    req.body.comefrom = "/try-post";
    req.body.clientMethod = "DELETE";
    res.json(req.body);
})

app.post("/try-upload", upload.single("avatar"), (req, res) => {    //upload, 一定要middleware,avatar丟到postman的KEY,postman要設定成formdata,第一欄改成file
    req.file.FormBody = req.body;
    res.json(req.file);
})

app.post("/try-uploads", upload.array("photo", 10), (req, res) => {   //上傳多張照片 single=>array 要把名字"photo"跟後面的name對到,後面參數給最多同時點選幾個

    res.json(req.files);   //多個檔案 file=>files
})

app.get("/my-params1/:action/:id", (req, res) => {      //網址 .../my-params1/haha(action)/15(id)
    res.json(req.params);
})

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/, (req, res) => {
    const ori_url = req.url.slice(3);
    u = ori_url.split("?")[0];
    a = u.split("-").join("")

    res.json({ ori_url, a });
})


app.use("/haha", require(__dirname + "/route/admin.js"))


app.get("/try-post-form", (req, res) => {                   //form
    res.render("try-post-form");
})


app.post("/try-post-form", (req, res) => {                  //form
    res.render("try-post-form", req.body);
})

app.get("/try-session", (req, res) => {                     //session
    req.session.myCount = req.session.myCount || 0,
        req.session.myCount++,
        res.json(req.session)
})

app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html")
    res.status(404).send(error.toString());
})



app.listen(process.env.PORT || 3000, () => {
    console.log("Server starts:", new Date());
})