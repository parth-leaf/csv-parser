const fs = require("fs");
const { parseCSVLine } = require("./utils/csv");

fs.readFile("./data/customers-100.csv", "utf-8", (error, data) => {
  fs.appendFile(
    "./output/data.json",
    "[\n",
    "utf-8",
    (error) => error && console.log("start", error),
  );
  const lines = data.split("\r\n");
  const header = lines[0].split(",");
  data.split("\r\n").forEach((ele, index) => {
    if (index === 0) return;

    const parseRow = parseCSVLine(ele);
    const row = {};

    header?.forEach((el, index) => {
      row[el] = parseRow[index];
    });

    const formatData =
      index < data.split("\r\n").length - 1
        ? JSON.stringify(row, null, 2) + ","
        : JSON.stringify(row, null, 2);

    // console.log(formatData);
    fs.appendFile(
      "./output/data.json",
      formatData,
      "utf-8",
      (error) => error && console.log("mid", error),
    );
  });

  fs.appendFile(
    "./output/data.json",
    "\n]",
    "utf-8",
    (error) => error && console.log("end", error),
  );
});
