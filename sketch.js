// --- BACKGROUND WALLPAPER (Cellular Automata) ---
var bgSketch = function (p) {
  let tiles = [];
  let w, h;
  let cellW = 15;
  let off;
  let seed;

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('bg-sketch-container');

    seed = p.int(p.random(10000000));
    p.noiseSeed(seed);
    p.randomSeed(seed);
    p.pixelDensity(1);
    p.angleMode(p.DEGREES);

    w = p.ceil(p.width / cellW);
    h = p.ceil(p.height / cellW);

    let totalCells = w * h;
    tiles = new Array(totalCells);

    for (let i = 0; i < totalCells; i++) {
      tiles[i] = p.random() < 0.47;
    }

    off = p.random(10000);

    for (var k = 0; k < 10; k++) {
      nextGen();
    }

    p.noLoop();
  };

  p.draw = function () {
    p.clear();
    p.noStroke();

    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        if (!isSolid(i, j)) {
          let d = getDistanceFromWall(i, j);
          if (d > 0) {
            p.fill(nc(d));
            p.square(i * cellW, j * cellW, cellW);
          }
        }
      }
    }
  };

  function nextGen() {
    let newTiles = new Array(tiles.length);
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        let idx = i + j * w;
        let neighbors = getNeighbors(i, j);
        newTiles[idx] = neighbors >= 5;
      }
    }
    tiles = newTiles;
  }

  function getNeighbors(x, y) {
    let solidNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (isSolid(x + i, y + j)) solidNeighbors++;
      }
    }
    return solidNeighbors;
  }

  function isSolid(i, j) {
    if (i < 0 || j < 0 || i >= w || j >= h) {
      return true;
    }
    return tiles[i + j * w];
  }

  function getDistanceFromWall(i, j) {
    let dist = -1;
    let r = 1;
    let maxR = 15;

    while (dist < 0 && r < maxR) {
      for (var a = 0; a < 360; a += 40) {
        let x = r * p.cos(a) * 0.5 + i;
        let y = r * p.sin(a) + j;

        if (isSolid(x, y)) {
          dist = r;
        }
      }
      r++;
    }
    return dist;
  }

  function nc(d) {
    p.randomSeed(d * 100 + off);
    p.push();
    p.colorMode(p.HSL, 360, 100, 100, 1);

    let hue = p.random() > 0.7 ? p.random(35, 50) : p.random(200, 260);
    let sat = p.random(70, 100);
    let lig = p.random(40, 70);
    let alp = 0.5;

    let c = p.color(hue, sat, lig, alp);
    p.pop();
    return c;
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.setup();
  };
};

// Initialize background sketch
new p5(bgSketch);

// --- SPLASH SCREEN TREE (only if element exists) ---
if (document.getElementById('splash-p5')) {
  var splashSketch = function (p) {
    p.setup = function () {
      let canvas = p.createCanvas(300, 300);
      canvas.parent('splash-p5');
      p.stroke(201, 176, 55);
      p.noFill();
    };

    p.draw = function () {
      p.background(15, 15, 45);
      let pulse = p.map(p.sin(p.frameCount * 0.05), -1, 1, 0.5, 0.6);
      p.translate(p.width / 2, p.height);
      p.strokeWeight(2);
      branch(70, pulse);
    };

    function branch(h, pulse) {
      h *= 0.66;
      if (h > 2) {
        p.push();
        p.rotate(pulse);
        p.line(0, 0, 0, -h);
        p.translate(0, -h);
        branch(h, pulse);
        p.pop();

        p.push();
        p.rotate(-pulse);
        p.line(0, 0, 0, -h);
        p.translate(0, -h);
        branch(h, pulse);
        p.pop();
      }
    }
  };
  new p5(splashSketch);
}

// --- SPLASH ENTER FUNCTION ---
function enterSite() {
  document.getElementById('splash-screen').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('main-site').classList.remove('hidden');
  }, 1000);
}
