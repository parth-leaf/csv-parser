const http = require("http");
const fs = require("fs");
const { convertIntoJson } = require("./async");

const port = process.env.PORT || 8000;

function* counter(start = 0) {
  let count = start;

  while (true) {
    yield count;
    count++;
  }
}

const gen = counter(1);

const server = http.createServer((req, res) => {
  const index = gen.next().value;
  const parseUrl = new URL(req.url, `http://${req.headers.host}`);

  switch (parseUrl) {
    case "/upload":
      if (req.method === "POST") {
        const file = fs.createWriteStream(`upload(${index}).bin`);
        req.pipe(file);

        req.on("end", () => {
          file.end();

          fs.readFile(`./upload(${index}).bin`, "utf-8", (error, data) => {
            convertIntoJson(data, `./output/sample(${index}).json`, () => {
              res.writeHead(200, { "Content-Type": "text/csv" });
              fs.createReadStream(`./output/sample(${index}).json`).pipe(res);
            });
          });
        });
      }
      break;

    default:
      fs.readFile("./index.html", (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;
  }
});

server.listen(port, () => {
  console.log("server running on PORT:", port);
});
