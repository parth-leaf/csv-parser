function csvToJson(csv) {
  const rows = [];
  let current = "";
  let insideQuotes = false;
  const result = [];

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "\n" && !insideQuotes) {
      rows.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  if (current) rows.push(current);

  const headers = rows[0].split(",");

  for (let i = 1; i < rows.length; i++) {
    const values = parseCSVLine(rows[i]);

    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = values[idx]?.replace(/^"|"$/g, "").trim();
    });

    result.push(obj);
  }

  return result;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

module.exports = { csvToJson, parseCSVLine };
