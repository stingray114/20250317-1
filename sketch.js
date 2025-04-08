let seaweedColors = [];
let seaweedLengths = [];
let iframe;

function setup() { //初始設定函數，只會執行一次
  // 創建畫布並設置 z-index
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '10'); // 設置畫布的 z-index 為較高的值
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件
  
  // 設定背景透明
  clear();
  
  // 創建 iframe 並設置屬性
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('top', `${windowHeight * 0.1}px`); // 設置 iframe 的垂直位置
  iframe.style('left', `${windowWidth * 0.1}px`); // 設置 iframe 的水平位置
  iframe.style('width', `${windowWidth * 0.8}px`); // 設置 iframe 的寬度為視窗的 80%
  iframe.style('height', `${windowHeight * 0.8}px`); // 設置 iframe 的高度為視窗的 80%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '1'); // 設置 iframe 的 z-index 為較低的值
  
  // 初始化每條海草的顏色和長度
  for (let i = 0; i < 40; i++) {
    seaweedColors.push(color(random(255), random(255), random(255), 100)); // 設置顏色和透明度為 100
    seaweedLengths.push(int(random(20, 40))); // 每條海草的段數減少，範圍從 20 到 40
  }
}

function draw() { //畫圖函數，會一直執行
  clear(); // 清除畫布，保持透明背景
  
  // 設定每條海草的數量
  let seaweedCount = 40; // 只畫出螢幕一半的海草
  
  // 設定每條海草的初始位置和長度
  for (let j = 0; j < seaweedCount; j++) {
    let baseX = (windowWidth / seaweedCount) * j + (windowWidth / seaweedCount) / 2;
    let baseY = windowHeight;
    let segmentLength = seaweedLengths[j]; // 使用固定的段數
    let width = 40; // 固定每條海草的寬度
    
    // 設定線條顏色為固定顏色
    let seaweedColor = seaweedColors[j];
    stroke(seaweedColor);
    // 設定線條粗細
    strokeWeight(width);
    noFill();
    
    // 畫每條海草的多個枝節
    beginShape();
    let x = baseX;
    let y = baseY;
    vertex(x, y);
    for (let i = 0; i < segmentLength; i++) {
      // 計算每個枝節的擺動
      let angle = sin(frameCount * 0.01 + i * 0.3 + j * 0.1) * 0.3; // 調整擺動頻率
      let newX = baseX + sin(angle) * width;
      let newY = y - 10; // 每個枝節的長度固定為10
      
      // 添加頂點
      vertex(newX, newY);
      
      // 更新下一個枝節的起始位置
      x = newX;
      y = newY;
    }
    endShape();
  }
}
