// class Site {
//   name(): void {
//     console.log("LGGLGGLGGL");
//   }
// }

// var obj = new Site();
// obj.name();

var uname: string = "LGGLGGLGGL";
var score1: number = 50;
var score2: number = 42.2;
var sum = score1 + score2;
console.log("名字: " + uname);
console.log("第一个科目成绩: " + score1);
console.log("第二个科目成绩: " + score2);
console.log("总成绩: " + sum);

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; width: number } {
  let newSquare = { color: "wihte", width: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }

  if (config.width) {
    newSquare.width = config.width * config.width;
  }

  return newSquare;
}

let mySquare = createSquare({ color: "black" });
console.log(mySquare);

interface Ponit {
  readonly x: number;
  readonly y: number;
}

let p1: Ponit = { x: 10, y: 30 };
// p1.x = 10 报错

let a: number[] = [1, 2, 2, 3, 4];
let b: ReadonlyArray<number> = a;
//b[0] = 100 报错

interface SearchFunction {
  (source: string, type: string): boolean;
}

let mySearch: SearchFunction;
mySearch = function(source: string, type: string) {
  let result = source.search(type);
  return result > -1;
};
console.log(mySearch);

interface StringArray {
  [index: number]: string;
}
let myArray: StringArray = ["bob", "tonney"];
let heArray: string[] = ["aaa", "bbb"];
console.log(myArray[0]);
console.log(heArray[0]);
