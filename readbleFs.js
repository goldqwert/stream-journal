const fs = require("fs");

const readStream = fs.createReadStream("./anime_dancing.mp4");

readStream.on("data", (chunk) => {
  console.log("size:", chunk.length);
});

readStream.on("end", (chunk) => {
  console.log("read stream ended");
});

readStream.on("error", (error) => {
  console.log("an error has occured");
  console.error(error);
});

readStream.pause();

process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "finish") {
    readStream.resume();
  }
  readStream.read();
  //   let text = chunk.toString().trim();
  //   console.log("echo:", text);
});
