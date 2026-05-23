const fs = require("fs");
const { parseCSVLine } = require("./utils/csv");
const { performance } = require("perf_hooks");

fs.readFile("./data/customers-2000000.csv", "utf-8", (error, data) => {
  if (error) {
    return console.log(error);
  }
  convertIntoJson(data, "./output/sample.json");
});

function convertIntoJson(data, targetPath, callback) {
  const writestream = fs.createWriteStream(targetPath, "utf-8");

  const lines = data.split("\r\n");
  const header = lines[0].split(",");

  writestream.write("[\n");

  lines.forEach((ele, index) => {
    if (index === 0) return;

    const parseRow = parseCSVLine(ele);
    const row = {};

    header?.forEach((el, index) => {
      row[el] = parseRow[index];
    });

    const formatData =
      index < lines.length - 1
        ? JSON.stringify(row, null, 2) + ","
        : JSON.stringify(row, null, 2);

    writestream.write(formatData);
  });

  writestream.write("\n]");
  writestream.end(() => {
    callback?.();
  });
}

module.exports = { convertIntoJson };
