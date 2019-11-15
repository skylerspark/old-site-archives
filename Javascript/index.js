// STUB START

function sleep(s) {
    return new Promise(r => setTimeout(r, s));
}

// STUB END

// TODO
async function link(link, title) {
    document.getElementById("contentCover").style.background = "white";
    await sleep(300);
    document.getElementById("pageContent").src = link;
    document.querySelector("title").innerHTML = title;
    await sleep(300);
    document.getElementById("contentCover").style.background = "transparent";
}

function go(linktex) {
    window.open(linktex, "_blank");
    window.focus();
}

function copyDisc() {
    var el = document.createElement('textarea');
    el.value = "Sir Code#4374";
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("header");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
