window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1e3 / 60)
  }
function randint(min, max) {
  return Math.floor(Math.random() * max) + min
}
let accuracy = 10
let gravity = 1000
let wind = 0
let cWind = 0
let clothY = 30
let clothX = 100
let spacing = 4
let tearDist = 60
let friction = 0.99
let bounce = 0.5
let noTop = false
let thickness = 1
let clothColors = ["white", "red", "orange", "yellow", "green", "blue", "indigo", "violet"]
let cc = 0
let pattern = false
let starRed = []
let starWhite = []
let usa = []
let patterns = [usa]
let cp = 0
let cpl = 0
let cPattern = 0
let usaNow = false
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = Math.min(window.innerWidth - 15)
canvas.height = Math.min(window.innerHeight - 35)

ctx.strokeStyle = '#fff'
function drawRect(color, x, y, width, height) {
ctx.fillStyle=color;
ctx.fillRect(x, y, width, height); 
//ctx.stroke();
}
let mouse = {
  cut: 8,
  influence: 36,
  down: false,
  button: 1,
  x: 0,
  y: 0,
  px: 0,
  py: 0
}

class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.px = x
    this.py = y
    this.vx = 0
    this.vy = 0
    this.pinX = null
    this.pinY = null

    this.constraints = []
  }

  update (delta) {
    if (this.pinX && this.pinY) return this

    if (mouse.down) {
      let dx = this.x - mouse.x
      let dy = this.y - mouse.y
      let dist = Math.sqrt(dx * dx + dy * dy)

      if (mouse.button === 1 && dist < mouse.influence) {
        this.px = this.x - (mouse.x - mouse.px)
        this.py = this.y - (mouse.y - mouse.py)
      } else if (dist < mouse.cut) {
        if (usaNow == false) {
        this.constraints = []
        }
      }
    }
    if (wind !== 0) {
      if (5 == randint(0, 50000)) {
        cWind = randint(wind - 50, 100)
        //alert(cWind)
        //document.getElementById("windSpeed").innerHTML = cWind
      }
    }
    this.addForce(cWind, gravity)

    let nx = this.x + (this.x - this.px) * friction + this.vx * delta
    let ny = this.y + (this.y - this.py) * friction + this.vy * delta

    this.px = this.x
    this.py = this.y

    this.x = nx
    this.y = ny

    this.vy = this.vx = 0

    if (this.x >= canvas.width) {
      this.px = canvas.width + (canvas.width - this.px) * bounce
      this.x = canvas.width
    } else if (this.x <= 0) {
      this.px *= -1 * bounce
      this.x = 0
    }

    if (this.y >= canvas.height) {
      this.py = canvas.height + (canvas.height - this.py) * bounce
      this.y = canvas.height
    } else if (this.y <= 0) {
      this.py *= -1 * bounce
      this.y = 0
    }

    return this
  }

  draw () {
    let i = this.constraints.length
    while (i--) this.constraints[i].draw()
  }

  resolve () {
    if (this.pinX && this.pinY) {
      this.x = this.pinX
      this.y = this.pinY
      return
    }

    this.constraints.forEach((constraint) => constraint.resolve())
  }

  attach (point) {
    this.constraints.push(new Constraint(this, point))
  }

  free (constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1)
  }

  addForce (x, y) {
    this.vx += x 
    this.vy += y
  }

  pin (pinx, piny) {
    this.pinX = pinx
    this.pinY = piny
  }
}

class Constraint {
  constructor (p1, p2) {
    this.p1 = p1
    this.p2 = p2
    this.length = spacing
  }

  resolve () {
    let dx = this.p1.x - this.p2.x
    let dy = this.p1.y - this.p2.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < this.length) return

    let diff = (this.length - dist) / dist
    if (usaNow == false) {
    if (dist > tearDist) this.p1.free(this)
      }
    let mul = diff * 0.5 * (1 - this.length / dist)

    let px = dx * mul
    let py = dy * mul

    !this.p1.pinX && (this.p1.x += px)
    !this.p1.pinY && (this.p1.y += py)
    !this.p2.pinX && (this.p2.x -= px)
    !this.p2.pinY && (this.p2.y -= py)

    return this
  }

  draw () {
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
  }
}

class Cloth {
  constructor (free) {
    this.points = []

    let startX = canvas.width / 2 - clothX * spacing / 2

    for (let y = 0; y <= clothY; y++) {
      for (let x = 0; x <= clothX; x++) {
        let point = new Point(startX + x * spacing, 20 + y * spacing)
        !free && y === 0 && point.pin(point.x, point.y)
        x !== 0 && point.attach(this.points[this.points.length - 1])
        y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)])

        this.points.push(point)
      }
    }
  }

  update (delta) {
    let i = accuracy

    while (i--) {
      this.points.forEach((point) => {
        point.resolve()
      })
    }
    ctx.beginPath()
    ctx.strokeStyle=clothColors[cc];
    if (pattern == false) {
    ctx.lineWidth=thickness
    }
    this.points.forEach((point) => {
      point.update(delta * delta).draw()
    })
    if (pattern == false) {
    ctx.stroke()
    }
    if (pattern == true) {
    this.points.forEach((point) => {
        cPattern = patterns[cp]
        drawRect(cPattern[cpl], point.x - (spacing + 5), point.y - (spacing + 5), spacing + 5, spacing + 5)
        cpl += 1
        if (cpl >= cPattern.length) {
          cpl = 0
      }
      })
    cpl += cPattern.length - 1
    }     

}
}
function setMouse(e) {
  let rect = canvas.getBoundingClientRect()
  mouse.px = mouse.x 
  mouse.py = mouse.y
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

window.onmousedown = (e) => {
  mouse.button = e.which
  mouse.down = true
  setMouse(e)
}

canvas.onmousemove = setMouse

window.onmouseup = () => (mouse.down = false)

canvas.oncontextmenu = (e) => e.preventDefault()

let cloth = new Cloth()

function CutUp() {
  mouse.cut += 1
  noTop = false
  //Increase Mouse-Tear strength
  }
function CutDown() {
  mouse.cut -= 1
  }
function CutS() {
  tearDist += 10
  }
function CutW() {
  tearDist -= 10
  }
function zeroG() {
  gravity = 0
}
function Gravity() {
  gravity = 1000
  }
function BounceDown() {
  bounce -= 0.5
}
function BounceUp() {
  bounce += 0.5
}
function Bounce6() {
  bounce = 1000
}
function addWind() {
  wind += 100
}
function removeWind() {
  wind -= 100
}
function clearWind() {
  wind = 0
}
function Thickness() {
  thickness += 1
}
function Thinness() {
  thickness -= 1
}
function bigger() {
  spacing += 1
  cloth = new Cloth(noTop)
}
function smaller() {
  if (spacing > 1) {
  spacing -= 1
  cloth = new Cloth(noTop)
  }
}
function messup() {
  spacing = -1
  cloth = new Cloth(noTop)
}
function bgchange1() {
  document.getElementById("bg").style.backgroundColor = "#26282c";
}
function colorChange() {
  var color = document.getElementById("color2").value;
  if (clothColors.indexOf(color) ==-1) {
    console.log("New color",color,clothColors)
    cc=clothColors.length-1; // prepare cc to be at end
    clothColors.push(color); // add new color at end
  }
  cc += 1; // business as usual
  pattern = false
  if (cc >= clothColors.length) {cc = 0}
}
function colorSet() {
  cc += 1
  pattern = false
  
}
function resetVars() {
 accuracy = 10
 gravity = 1000
 wind = 0
 cWind = 0
 clothY = 30
 clothX = 100
 spacing = 4
 tearDist = 60
 friction = 0.99
 bounce = 0.5
 noTop = false
 thickness = 1
}
function Reset() {
  cloth = new Cloth(noTop)
}
function X1() {
  clothX -= 2
    cloth = new Cloth(noTop)
}
function X2() {
  clothX += 2
    cloth = new Cloth(noTop)
}
function Y1() {
  clothY -= 2
    cloth = new Cloth(noTop)
}
function Y2() {
  clothY += 2
    cloth = new Cloth(noTop)
}
function Notopa() {
  noTop =  true;
    cloth = new Cloth(noTop)
}
function godmod() {
  tearDist = 1000;
}
;(function update (time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  cloth.update(0.016)
  document.getElementById("meters").innerHTML = ' Wind: ' + Math.round(wind / 10) + ' ||| Size: ' + spacing + ' ||| xY: '+ clothX + '.' + clothY + '  ||| CutSize: '+ mouse.cut + ' ||| WireThickness: '+ thickness + ' ||| Colors: '+ cc + ' ||| Bounce: '+ bounce + ' ||| Strength: '  + Math.round(tearDist)
  if (usaNow == true) {
  document.getElementById("directions").innerHTML = ""
  }
  else {
  document.getElementById("directions").innerHTML = ""
  }
  if (cp == 0) {if (pattern == true) {usaNow = true}}
    else {
    usaNow = false
      }
    if (pattern == false) {
    usaNow = false
      }
  window.requestAnimFrame(update)
})(0)
ing = "0px";

function textex () {}

//DAT.GUI Tests.

var text;

var sampleText = function() {
  this.Rave = false;
  this.Reset = Reset;
  this.Defect = resetVars;
  this.UnTearable = false;
  this.NoTop = Notopa;
  this.MoreDragPower = CutW;
  this.LessDragPower = CutS;
  this.Taller = Y2;
  this.Shorter = Y1;
  this.Wider = X2;
  this.Thinner = X1;
  this.Gravity = true;
  this.GlitchyBounce = Bounce6;
  this.ImplodeCloth = messup;
  this.MoreWind = addWind;
  this.LessWind = removeWind;
  this.MoreBounce = BounceUp;
  this.LessBounce = BounceDown;
  this.TickerLines = Thickness;
  this.ThinnerLines = Thinness;
  this.LargerCut = CutUp;
  this.SmallerCut = CutDown;
  this.LargerCloth = bigger;
  this.SmallerCloth = smaller;
  this.WindMeter = textex;
  this.ChangeColor = colorChange;
  this.colorfy = "#ffffff";
};

window.onload = function() {
  text = new sampleText();
  setValue();
  var gui = new dat.GUI();
  gui.add(text, 'Rave').onChange(setValue);
  gui.add(text, 'Gravity').onChange(setValue);
  gui.add(text, 'UnTearable').onChange(setValue);
  gui.addColor(text, 'colorfy')
 var f1 = gui.addFolder('Cloth');
  f1.add(text, 'Reset');
  f1.add(text, 'Defect');
  f1.add(text, 'NoTop');
  f1.add(text, 'ChangeColor');
  f1.close();
  var f12 = gui.addFolder('Effects');
  f12.add(text, 'GlitchyBounce');
  f12.add(text, 'ImplodeCloth');
  f12.add(text, 'MoreBounce');
  f12.add(text, 'LessBounce');
  f12.add(text, 'MoreWind');
  f12.add(text, 'LessWind');
  f12.close();
  var f2 = gui.addFolder('Strength Related');
  f2.add(text, 'MoreDragPower');
  f2.add(text, 'LessDragPower');
  f2.add(text, 'LargerCut');
  f2.add(text, 'SmallerCut');
  f2.close();
  var f3 = gui.addFolder('Vector Stuff');
  f3.add(text, 'Taller');
  f3.add(text, 'Shorter');
  f3.add(text, 'Wider');
  f3.add(text, 'Thinner');
  f3.add(text, 'ThickerLines');
  f3.add(text, 'ThinnerLines');
  f3.add(text, 'LargerCloth');
  f3.add(text, 'SmallerCloth');
  f3.close();
  gui.add(text, 'WindMeter');
}
var intervalID;

function setValue() {
  if(text.Rave) {
   intervalID = window.setInterval(colorChange, 100);
  }
  else {
   clearInterval(intervalID);
  }
  if(text.Gravity) {
    gravity = 1000;
  }
  else {
    gravity = 0;
  }
  if(text.UnTearable) {
    tearDist = 1000;
  }
  else {
    tearDist = 60;
  }
}