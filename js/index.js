// Navigator

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// My custom link function

function link(linktex) {
  window.location.assign(linktex);
  console.log("Redirecting to " + linktex);
}


// Hide debug element on page load

window.onload = function() {
  document.getElementById('a7').style.display = 'none';
}


// Konami Code thing to show Debug Link

var allowedKeys = {
  32: '1',
  37: '2',
  38: '3',
  39: '4',
  40: '5',
  65: '6',
  69: '7',
  78: '8',
  89: '9'
};
var kCode = ['1','3','4','5','6','9','1','7','2','8','6','9','4','5','1'];
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


// Show Hidden Debug Link

function funcActive() {
  document.getElementById('a7').style.display = 'block!important';
  document.getElementById('a7').style.visibility = 'visible!important';
}


// IP Grabber (Render a Public IP)

fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(obj => obj.ip)
  .then(ip => {
 document.getElementById("ip").textContent = "Connecting From: " + ip
})
