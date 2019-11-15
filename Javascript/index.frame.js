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
