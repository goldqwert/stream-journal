const { Readable } = require("stream");

const advices = [
  "Hey. How are you?",
  "No ice for drinks? Use frozen vegetables",
];

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true }); // encoding: "UTF-8" => converting buffer to string
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const adviceStream = new StreamFromArray(advices);

adviceStream.on("data", (chunk) => console.log(chunk));

adviceStream.on("end", () => console.log("done!"));
