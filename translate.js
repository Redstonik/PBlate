var buttonpres = false
var translated = false
var original = ""
chrome.storage.local.get(['translate_url'], function(result) {
    url = result.translate_url;
});


if (/probleme\/\d+/.test(window.location.pathname) && 
    !/subpagina/.test(window.location.search)) {


    function trans() {
        if (!translated) {
            original = document.getElementById("enunt").innerHTML
            
            function reqListener () {
                document.getElementById("enunt").innerHTML = this.responseText;
                translated = true
            }
            var loc = /probleme\/(\d+)/.exec(window.location.pathname)[1]
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.open("GET", `${url}/${loc}.html`);
            oReq.send();
        } else {
            document.getElementById("enunt").innerHTML = original
            translated = false
        }
    }

    const p = document.getElementById("problema-wrapper");
    const enuntel = document.getElementById("meniu-problema-enunt");
    const butel = document.createElement("button");

    butel.onclick = trans;
    butel.innerText = "Forditas";
    butel.style.float = "right";
    p.prepend(butel);
    
    const callback = function(mutationsList) {
        if (enuntel.classList.contains("active")) {
            if (p.firstElementChild.id == "enunt" && !buttonpres) {
                p.prepend(butel);
                buttonpres = true
            }
        } else {
            buttonpres = false
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(p, {childList: true});
}
