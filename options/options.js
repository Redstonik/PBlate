function save() {
    var options = {
        "url" : document.getElementById("url").value ,
        "showExport" : document.getElementById("exportbtn").checked,
        "showEdit" : document.getElementById("editbtn").checked
    }
    chrome.storage.local.set({'options': options}, function() {
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
    chrome.storage.local.get(['options'], function(result) {
        document.getElementById("url").value = result.options["url"];
        document.getElementById("exportbtn").checked = result.options["showExport"];
        document.getElementById("editbtn").checked = result.options["showEdit"];
    });
}
