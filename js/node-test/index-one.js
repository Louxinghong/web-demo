var fs = require("fs");

// var data = fs.readFileSync("./test-files/input.txt");
// console.log(data.toString());
// console.log("machine is over");

fs.readFile("./test-files/input.txt", function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(data.toString());
});
console.log("machine is over");
