
var cols, rows;
var n = 85;
var scl = 15;
var w = 1200;
var h = 1200;

// var txtWidth;

// function preload() {
//   font = loadFont('https://fonts.gstatic.com/s/newscycle/v14/CSR54z1Qlv-GDxkbKVQ_dFsvWNRevA.ttf');
// }
const btn = document.querySelector('button'),
  chunks = [];


function record() {
  chunks.length = 0;
  let stream = document.getElementById('defaultCanvas0').captureStream(),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  btn.onclick = e => {
    recorder.stop();
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  recorder.start();
  btn.textContent = 'stop recording';
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement('video');
  vid.id = 'recorded'
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}
btn.onclick = record;


var flying = 0;
var zoff=0;
var terrain = [];


function setup() {
  cnv=createCanvas(1200, 1300);
  cols = w/ scl;
  rows = n;
  // textFont(font);
  // textSize(40);
  // textAlign(CENTER, CENTER);
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = -100; //specify a default value for now
    }
  }

}


var xfly=0
function draw() {
  flying+=30
  yoff=flying
  xfly-=0.1*Math.random()
  for (var y = 0; y < rows; y++) {
    var xoff = xfly;
    for (var x = 0; x < cols; x++) {
      xoff+=0.1;
      terrain[x][y] = map(noise(xoff,yoff),0,1,-300*Math.max(.05,Math.exp(-Math.pow(x-cols/2,2)/cols/4))*Math.max(.05,Math.exp(-Math.pow(y-rows/2,2)/rows/15)),
                                                         1);
      
    }
    yoff+=30
    }
  
  translate(0,50)
  background(0);
  // translate(100, 100);
  // rotateX(PI/3);
  // noStroke();
  // stroke(0,255,249,0);
  // stroke(216,36,124,225);
  stroke(255,255,255);
  //todo - zmieniajace sie kolory
  fill(0);
  // translate(50, -190,200);
  for (var y = 0; y < rows-1; y++) {
    strokeWeight(3);
    beginShape();
    vertex(0,(y+1)*w/n);
    for (var x = 0; x < cols-1; x++) {
      vertex((x*scl+scl), (y+1)*w/n+terrain[x][y]);
    }
    vertex(cols*scl+scl,(y+1)*w/n);
    endShape();
  }

}

