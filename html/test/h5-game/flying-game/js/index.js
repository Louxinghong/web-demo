let timeRemaining = 10; // 剩余时间
let targetScore = 0; // 目标分数
let currentScore = 0; // 当前分数
let isOnWeChat = false; // 是否在微信端打开
let musicRotateTimer = null; // 音乐图标旋转计时器
let rotateDegree = 0; // 音乐图标旋转度数
let isRotate = true; // 音乐图标是否在旋转
let timeRemainingElement = document.getElementById("time-remaining");
let targetScoreElement = document.getElementById("target-score");
let currentScoreElement = document.getElementById("current-score");
let musicIcon = document.getElementById("music-icon");
let musicMP3 = document.getElementById("music");
let testGif = document.getElementById("test-img");
let btnStart = document.getElementById("btn-start");
let testButton = document.getElementById("btn-fly");
let endWord = document.getElementById("end-word");

// 音乐图标点击事件
musicIcon.onclick = function () {
  if (isRotate) {
    isRotate = false;
    clearInterval(musicRotateTimer);
    musicIcon.src = "../img/music-off.png";
    musicMP3.pause();
  } else {
    isRotate = true;
    changeMusicRotateDegree();
    musicIcon.src = "../img/music-on.png";
    musicMP3.play();
  }
};

// 判断是否在微信端打开
function onJudgeAtWeChat() {
  let res = navigator.userAgent.toLowerCase();
  if (res.match(/MicroMessenger/i) === "micromessenger") {
    isOnWeChat = true;
  } else {
    isOnWeChat = false;
  }
}

// 改变音乐图标旋转度数
function changeMusicRotateDegree() {
  musicIconRotate();
  musicRotateTimer = setInterval(function () {
    rotateDegree += 10;
    musicIconRotate();
  }, 100);
}

// 音乐图标旋转
function musicIconRotate() {
  musicIcon.style.transition = "0.1s linear";
  musicIcon.style.transform = "rotate(" + rotateDegree + "deg)";
}

// 封装GIF播放和停止方法
function imgPlayAndStop() {
  if ("getContext" in document.createElement("canvas")) {
    HTMLImageElement.prototype.play = function () {
      if (this.storeCanvas) {
        // 移除存储的canvas
        this.storeCanvas.parentElement.removeChild(this.storeCanvas);
        this.storeCanvas = null;
        // 透明度还原
        image.style.opacity = "";
      }
      if (this.storeUrl) {
        this.src = this.storeUrl;
      }
    };
    HTMLImageElement.prototype.stop = function () {
      let canvas = document.createElement("canvas");
      // 尺寸
      let width = this.width;
      let height = this.height;
      if (width && height) {
        // 存储之前的地址
        if (!this.storeUrl) {
          this.storeUrl = this.src;
        }
        // canvas大小
        canvas.width = width;
        canvas.height = height;
        // 绘制图片帧（第一帧）
        canvas.getContext("2d").drawImage(this, 0, 0, width, height);
        // 重置当前图片
        try {
          this.src = canvas.toDataURL("image/gif");
        } catch (e) {
          // 跨域
          this.removeAttribute("src");
          // 载入canvas元素
          canvas.style.position = "absolute";
          // 前面插入图片
          this.parentElement.insertBefore(canvas, this);
          // 隐藏原图
          this.style.opacity = "0";
          // 存储canvas
          this.storeCanvas = canvas;
        }
      }
    };
  }
}

// 开始按钮点击事件
btnStart.onclick = function () {
  let countDown = null;
  testGif.play();
  btnStart.style.display = "none";
  testButton.style.display = "inline-block";
  countDown = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timeRemainingElement.innerText = "时间：" + timeRemaining + "s";
    } else {
      testButton.style.display = "none";
      endWord.style.display = "inline-block";
      testGif.stop();
      clearInterval(countDown);
    }
  }, 1000);
};

// 底部测试按钮点击事件
testButton.onclick = function () {
  currentScore += 10;
  currentScoreElement.innerText = "当前分数：" + currentScore;
  // if (this.value === "暂停") {
  //   testGif.stop();
  //   this.value = "播放";
  // } else {
  //   testGif.play();
  //   this.value = "暂停";
  // }
};

window.onload = function () {
  imgPlayAndStop();

  timeRemainingElement.innerText = "时间：" + timeRemaining + "s";
  targetScoreElement.innerText = "目标分数：" + targetScore;
  currentScoreElement.innerText = "当前分数：" + currentScore;

  testGif.stop();
  testButton.style.display = "none";
  endWord.style.display = "none";

  changeMusicRotateDegree();
  // musicMP3.play();
};
