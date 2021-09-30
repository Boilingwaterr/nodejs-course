const csv = require("csvtojson");
const { createReadStream, createWriteStream } = require("fs");

const input = "./csv/index.csv";
const output = "./text/index.txt";

const readStream = createReadStream(input);
const writeStream = createWriteStream(output);

writeStream.on("error", handleError);
readStream.on("error", handleError);

readStream
  .pipe(
    csv({
      ignoreColumns: /amount/,
      colParser: { price: "number" },
    }).preFileLine((fileLineString, lineIdx) => {
      return new Promise((resolve) => {
        let newLine = fileLineString;

        if (lineIdx === 0) {
          newLine = fileLineString.toLowerCase();
        }

        resolve(newLine);
      });
    })
  )
  .on("error", handleError)
  .pipe(writeStream)
  .on("error", handleError);

function handleError(error) {
  console.error(error.message);
}
