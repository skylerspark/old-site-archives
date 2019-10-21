// Navigator

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
 }
 function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
 }
 
 // My custom link function
 
 function link(linktex) {
  window.open(linktex, "_blank");
  win.focus();
  console.log("Redirecting to " + linktex);
 }
 
 // Mechanism for Copier
 
 function copyFunc() {
  var copyText = document.getElementById("copyInp");
  copyText.select();
  document.execCommand("copy"); //this function copies the text of the input with ID "copyInp"
 }
 