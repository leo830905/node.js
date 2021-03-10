const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(async (req, res) => {
    const str = await fs.readFile(__dirname + "/Headers.json");
    res.end(str);
})
const a = require("")
server.listen(3000);