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

// Mechanism for Copier

function copyFunc() {
  var copyText = document.getElementById("copyInp");
  copyText.select();
  document.execCommand("copy"); //this function copies the text of the input with ID "copyInp"
}

