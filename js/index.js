// Navigator

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// My custom link function

function link(linktex) {
  window.open(linktex, '_blank');
  win.focus();
  console.log("Redirecting to " + linktex);
}


// IP Grabber (Render a Public IP)

fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(obj => obj.ip)
  .then(ip => {
 document.getElementById("ip").textContent = "Connecting From: " + ip
});

// Visual Mechanism for Copier

function myFunction() {
  var copyText = document.getElementById("copyInp");  
  copyText.select();
  document.execCommand("copy");  //this function copies the text of the input with ID "copyInp"
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied";  //displays tooltip to show its copied
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";  //shows tooltip on hover
}

