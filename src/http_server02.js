const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {            //fs.writeline三個參數 
    fs.writeFile(__dirname + "/Headers.json",               // 1.寫到的路徑 
        JSON.stringify(req.headers),                        // 2.寫到路徑裡的內容
        (error) => {                                        // 3.callback function =>網頁顯示
            if (error) {
                res.end("error:" + error)
            }
            else {
                res.end("ok:" + new Date())
            }
        }
    )

})
server.listen(3000);