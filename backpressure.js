const fs = require("fs");

const readStream = fs.createReadStream("./anime_dancing.mp4");
const writeStream = fs.createWriteStream("./copy.mp4", {
  highWaterMark: 1628920,
});

readStream.on("data", (chunk) => {
  const result = writeStream.write(chunk);

  if (!result) {
    console.log("backpressure");
    readStream.pause();
  }
});

readStream.on("error", (error) => {
  console.log("an error has occured");
  console.error(error);
});

readStream.on("end", (chunk) => {
  writeStream.end();
});

writeStream.on("drain", () => {
  console.log("drained");
  readStream.resume();
});

readStream.on("close", () => {
  process.stdout.write("file copied \n");
});
