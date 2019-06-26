function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function link(linktex) {
  window.location.assign(linktex);
  console.log("Redirecting to " + linktex);
}

window.onload = function() {
  document.getElementById('a7').style.display = 'none';
}

var allowedKeys = {
  32: 'spc',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};
var kCode = ['spc','up','down','spc'];
var kCodePos = 0;

document.addEventListener('keydown', function(e) {
  var key = allowedKeys[e.keyCode];
  var requiredKey = kCode[kCodePos];
  if (key == requiredKey) {
    kCodePos++;
    if (kCodePos == kCode.length) {
      funcActive();
      kCodePos = 0;
    }
  } else {
    kCodePos = 0;
  }
});

function funcActive() {
  document.getElementById('a7').style.display = 'initial';
}