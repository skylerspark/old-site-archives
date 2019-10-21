function sleep(s) {
    return new Promise(r => setTimeout(r, s));
}

async function link(link) {
    document.getElementById("contentCover").style.background = "white";
    await sleep(500);
    document.getElementById("pageContent").src = link;
    await sleep(500);
    document.getElementById("contentCover").style.background = "transparent";
}