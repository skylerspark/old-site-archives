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


// IP Grabber (Render a Public IP)

fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(obj => obj.ip)
  .then(ip => {
 document.getElementById("ip").textContent = "Connecting From: " + ip
});
