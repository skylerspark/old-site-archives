// STUB START

function sleep(s) {
    return new Promise(r => setTimeout(r, s));
}

// STUB END

// TODO
async function link(link) {
    document.getElementById("contentCover").style.background = "white";
    await sleep(300);
    document.getElementById("pageContent").src = link;
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

function checkDimensions() {
    if (document.body.innerWidth <= 320) {

    } else if (document.body.innerWidth >= 321 && document.body.innerWidth <= 400) {

    } else if (document.body.innerWidth >= 401 && document.body.innerWidth <= 960) {

    } else if (document.body.innerWidth >= 961) {

    }
}
