let spriteSheet;
let frameCount = 8; // 精靈圖中總共 8 張照片
let frameWidth = 1787 / frameCount; // 每幀寬度
let frameHeight = 171; // 每幀高度
let currentFrame = 0;
let frameCounter = 0;
let frameDelay = 5; // 動畫速度，數值越小越快
let scale = 1; // 顯示放大倍數（需要放大時調整）
let song;
let amp;

function preload() {
  spriteSheet = loadImage('1/all.png');
  // 載入音樂檔案，請將 'music.mp3' 替換成您在 music 資料夾中的實際檔名
  song = loadSound('music/music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  amp = new p5.Amplitude();
}

function draw() {
  // 根據音量大小調整動畫速度
  let level = amp.getLevel();
  frameDelay = map(level, 0, 0.5, 15, 0); // 將音量大小 (0 到 0.5 之間) 映射到幀延遲 (15 到 0 之間)，音量越大，延遲越小，動畫越快
  // 背景色 FEFAE0
  background('#FEFAE0');

  // 更新幀
  frameCounter++;
  if (frameCounter > frameDelay) {
    currentFrame = (currentFrame + 1) % frameCount;
    frameCounter = 0;
  }

  // 精靈來源位置
  let sourceX = currentFrame * frameWidth;
  let sourceY = 0;

  // 顯示尺寸與置中位置
  let displayW = frameWidth * scale;
  let displayH = frameHeight * scale;
  let x = (width - displayW) / 2;
  let y = (height - displayH) / 2;

  // 畫出當前幀（sourceX, sourceY, frameWidth, frameHeight）
  image(spriteSheet, x, y, displayW, displayH, sourceX, sourceY, frameWidth, frameHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 為了符合瀏覽器政策，通常需要使用者互動才能播放聲音。此處設定為點擊滑鼠後開始循環播放音樂。
  if (!song.isPlaying()) {
    song.loop();
  }
}
