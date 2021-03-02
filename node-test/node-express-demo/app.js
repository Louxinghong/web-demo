const cheerio = require("cheerio");
const superagent = require("superagent");
const fs = require("fs");
const nodeSchedule = require("node-schedule");

const weiboUrl = "https://s.weibo.com";
const hotSearchUrl = weiboUrl + "/top/summary?cate=realtimehot";

const rule = "01 * * * * *";

getHotSearchData = () => {
  superagent.get(hotSearchUrl, (err, res) => {
    if (!err) {
      const data = filter(res.text);
      return data;
    } else {
      console.log(err);
    }
  });
};

function filter(html) {
  const $ = cheerio.load(html);
  let data = [];

  $("#pl_top_realtimehot table tbody tr").each(function (index) {
    if (index !== 0) {
      const $td2 = $(this).children().eq(1);
      const link = weiboUrl + $td2.find("a").attr("href");
      const text = $td2.find("a").text();
      const hotCount = $td2.find("span").text();
      const icon = $td2.find("img").attr("src")
        ? "https:" + $td2.find("img").attr("src")
        : "";
      const $td3 = $(this).children().eq(2);
      const hotText = $td3.find("i") ? $td3.find("i").text() : "";

      data.push({
        link,
        text,
        hotCount,
        icon,
        hotText,
      });
    }
  });
  return data;
}

nodeSchedule.scheduleJob(rule, async () => {
  try {
    const hotDataList = await getHotSearchData();
    fs.writeFile(
      "./appData.json",
      JSON.stringify(hotDataList),
      "utf-8",
      function (err) {
        if (!err) {
          console.log("文件写入完毕");
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
