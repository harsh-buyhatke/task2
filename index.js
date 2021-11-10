const express = require("express");
const fs = require("fs");

const app = express();

// streaming method

app.get("/", (req, res) => {
  const rstream = fs.createReadStream("input.txt");
  const writestream = fs.createWriteStream("write.txt");
  rstream.on("data", (data) => {
    res.write(data);
    writestream.write(data);
  });
  rstream.on("end", () => {
    res.end();
  });
  rstream.on("error", (err) => {
    console.log(err);
    res.end(`${err}`);
  });
});

app.listen(8000, (err) => {
  if (err) throw err;
  console.log(`running on port 8000`);
});

// orthodox

app.get("/old", (req, res) => {
  fs.readFile("input.txt", (err, data) => {
    if (err) res.write(err);
    else {
        fs.appendFile('write1.txt', data, (err) => {
            if (err)
              throw err
      })
        res.write(data.toString());
        res.end();
        
    }
  });
});
