const request = require("request");
const https = require("https");
const fs = require("fs");

request(
  {
    url: "https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed",
    method: "post",
    json: true,
    headers: {
      "content-type": "application/json",
      Cookie: "",
    },
    body: {
      client_type: 2608,
      cursor: "0",
      id_type: 2,
      limit: 20,
      sort_type: 200,
    },
  },
  function (error, res, body) {
    if (!error && res.body.err_msg === "success") {
      let data = [];

      res.body.data.forEach((item) => {
        if (item.item_info.article_info) {
          data.push({
            title: item.item_info.article_info.title,
            digg_count: item.item_info.article_info.digg_count,
            comment_count: item.item_info.article_info.comment_count,
            picUrl: item.item_info.article_info.cover_image,
          });
        }
      });

      // 写入数据
      fs.writeFile("./juejinData.json", JSON.stringify(data), function (err) {
        if (!err) {
          console.log("文件写入完毕");
        }
      });

      // 下载图片
      data.forEach((item, index) => {
        const picUrl = item.picUrl;

        if (picUrl) {
          https.get(picUrl, function (res) {
            res.setEncoding("binary");
            let str = "";
            res.on("data", function (chunk) {
              str += chunk;
            });
            res.on("end", function () {
              fs.writeFile(
                `./juejinImages/${index}.png`,
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
    }
  }
);
