function save() {
    value = document.getElementById("url").value
    chrome.storage.local.set({'translate_url': value}, function() {
        el = document.getElementById("out")
        el.innerText = "Succes";
        setTimeout( function() {
            el.innerText = ""
        }, 2000)
    });
}

window.onload = function () {
    document.getElementById("svbtn").onclick = function () {
        save()
    }
    chrome.storage.local.get(['translate_url'], function(result) {
        document.getElementById("url").value = result.translate_url;
    });
}
