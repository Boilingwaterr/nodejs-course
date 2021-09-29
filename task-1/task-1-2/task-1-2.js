const csv = require("csvtojson");
const { createReadStream, createWriteStream } = require("fs");

const input = "./csv/index.csv";
const output = "./text/index.txt";

const readStream = createReadStream(input);
const writeStream = createWriteStream(output);

writeStream.on("error", handleError);
readStream.on("error", handleError);

readStream.pipe(csv()).pipe(writeStream);

function handleError(error) {
  console.error(error.message);
}
