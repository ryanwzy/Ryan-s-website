var walls = [];
var light = {};
var polygonVerts = [];
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {

   var cnv = createCanvas(windowWidth, windowHeight);
   // cnv.parent('bg_p5');

    // Light type: 'POINT' or 'SUN' (point infinitely far)
    light = new Light('POINT');

    // 1. Regular polygon of walls
    let center = createVector(width / 2, height / 2);
    let radius = 60;
    let edges = 3;

    let prev = {};
    for (let i = 0; i < edges; i++) {
        let nxt = p5.Vector.fromAngle(i * TAU / edges).mult(radius).add(center);
        polygonVerts.push(createVector(nxt.x, nxt.y));
        if (i > 0) {
            walls.push(new Wall(prev.x, prev.y, nxt.x, nxt.y));
        }
        prev = nxt;
    }
    let first = p5.Vector.fromAngle(0).mult(radius).add(center);
    walls.push(new Wall(prev.x, prev.y, first.x, first.y));
}

function draw() {
    background(0, 184, 219);


    light.setPos(mouseX, mouseY);


    light.scanWalls(walls);
    light.display(color(255));
    light.castShadow(color(0, 50));

    // Polygon
    fill(255);
    beginShape();
    for (let vert of polygonVerts) {
        vertex(vert.x, vert.y);
    }
    endShape(CLOSE);

    // println(frameRate());
}


/* Wall class */
var Wall = function(x0, y0, x1, y1) {
    this.point0 = createVector(x0, y0);
    this.point1 = createVector(x1, y1);
}
Wall.prototype = {
    display: function() {
        strokeWeight(2);
        stroke(255);
        line(this.point0.x, this.point0.y, this.point1.x, this.point1.y);
    }
}

/* Light class*/
var Light = function(typ = 'POINT') {
    this.typ = typ; // 0 point | 1 sun
    this.angle = 0; // If type 0 (point)
    this.pos = createVector(100, 100);
    this.shadows = [
        []
    ];
    this.maxDist = sqrt(width * width + height * height);
}
Light.prototype = {
    setPos: function(x, y) {
        this.pos.set(x, y);
    },
    scanWalls: function(walls) {
        for (let i = 0; i < walls.length; i++) {
            this.shadows[i] = [];

            this.shadows[i][0] = walls[i].point0;
            this.shadows[i][1] = walls[i].point1;

            if (this.typ == 'POINT') {
                let relPos0 = p5.Vector.sub(walls[i].point0, this.pos);
                let relPos1 = p5.Vector.sub(walls[i].point1, this.pos);
                this.shadows[i][2] = p5.Vector.mult(relPos1, this.maxDist).add(this.pos);
                this.shadows[i][3] = p5.Vector.mult(relPos0, this.maxDist).add(this.pos);
            } else if (this.typ == 'SUN') {
                let relPos = p5.Vector.sub(createVector(width / 2, height / 2), this.pos).normalize();
                this.shadows[i][2] = p5.Vector.mult(relPos, this.maxDist).add(walls[i].point1);
                this.shadows[i][3] = p5.Vector.mult(relPos, this.maxDist).add(walls[i].point0);
            }
        }
    },
    display: function(col) {
        fill(col);
        ellipse(this.pos.x, this.pos.y, 1, 1);
    },
    castShadow: function(col) {
        fill(col);
        noStroke();
        for (let i = 0; i < this.shadows.length; i++) {
            beginShape();
            for (let j = 0; j < this.shadows[i].length; j++) {
                vertex(this.shadows[i][j].x, this.shadows[i][j].y);
            }
            endShape(CLOSE);
        }
    }
}