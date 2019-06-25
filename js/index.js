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