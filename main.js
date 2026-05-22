const fs = require("fs");
const { parseCSVLine } = require("./utils/csv");

const result = fs.readFileSync("./data/customers-100.csv", "utf-8");
const lines = result.split("\r\n");
const header = lines[0].split(",");

fs.appendFileSync("./output/data.json", "[\n", "utf-8");

lines.forEach((ele, index) => {
  if (index === 0) return;

  const parseRow = parseCSVLine(ele);
  const data = {};

  header.forEach((el, index) => {
    data[el] = parseRow[index];
  });

  const formatData =
    index < lines.length - 1
      ? JSON.stringify(data, null, 2) + ","
      : JSON.stringify(data, null, 2);

  fs.appendFileSync("./output/data.json", formatData, "utf-8");
});

fs.appendFileSync("./output/data.json", "\n]", "utf-8");
