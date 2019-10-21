// STUB START

function sleep(s) {
    return new Promise(r => setTimeout(r, s));
}

// STUB END

// TODO
async function link(link) {
    document.getElementById("contentCover").style.background = "white";
    await sleep(500);
    document.getElementById("pageContent").src = link;
    await sleep(500);
    document.getElementById("contentCover").style.background = "transparent";
}

function go(linktex) {
    window.open(linktex, "_blank");
    win.focus();
}

// FIXME
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