const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");

https.get("https://movie.douban.com/top250", function (res) {
  let html = "";
  res.on("data", function (chunk) {
    html += chunk;
  });
  res.on("end", function () {
    // console.log(html);
    filter(html);
  });
});

function filter(html) {
  const $ = cheerio.load(html);
  let allFilms = [];
  $("li .item").each(function () {
    // this 循环时 指向当前这个电影
    // 当前这个电影下面的title
    // 相当于this.querySelector
    const title = $(".title", this).text();
    const star = $(".rating_num", this).text();
    const pic = $(".pic img", this).attr("src");

    allFilms.push({
      title,
      star,
      pic,
    });

    // 写入数据
    fs.writeFile("./doubanData.json", JSON.stringify(allFilms), function (err) {
      if (!err) {
        console.log("文件写入完毕");
      }
    });

    // 下载图片
    allFilms.forEach((item, index) => {
      const picUrl = item.pic;

      if (picUrl) {
        https.get(picUrl, function (res) {
          res.setEncoding("binary");
          let str = "";
          res.on("data", function (chunk) {
            str += chunk;
          });
          res.on("end", function () {
            fs.writeFile(
              `./doubanImages/${index}.png`,
              str,
              "binary",
              function (err) {
                if (!err) {
                  console.log(`第${index}张图片下载成功`);
                } else {
                  console.log(err);
                }
              }
            );
          });
        });
      }
    });
  });
}
