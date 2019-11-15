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
