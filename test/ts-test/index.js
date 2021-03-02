// class Site {
//   name(): void {
//     console.log("LGGLGGLGGL");
//   }
// }
// var obj = new Site();
// obj.name();
var uname = "LGGLGGLGGL";
var score1 = 50;
var score2 = 42.2;
var sum = score1 + score2;
console.log("名字: " + uname);
console.log("第一个科目成绩: " + score1);
console.log("第二个科目成绩: " + score2);
console.log("总成绩: " + sum);
function createSquare(config) {
    var newSquare = { color: "wihte", width: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.width = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log(mySquare);
var p1 = { x: 10, y: 30 };
// p1.x = 10 报错
var a = [1, 2, 2, 3, 4];
var b = a;
var mySearch;
mySearch = function (source, type) {
    var result = source.search(type);
    return result > -1;
};
console.log(mySearch);
var myArray = ["bob", "tonney"];
var heArray = ["aaa", "bbb"];
console.log(myArray[0]);
console.log(heArray[0]);
