var buttonpres = false
var translated = false
var original = ""
var options = {}

chrome.storage.local.get(['options'], function(result) {
    options = result.options;
    if (document.readyState == "complete") {
        mainInterject()
    } else {
        window.addEventListener("load", function(e) {
            mainInterject()
        })
    }
});


function getProblemId() {
    return /probleme\/(\d+)/.exec(window.location.pathname)[1]
}



function mainInterject() {
    if (/probleme\/\d+/.test(window.location.pathname) && 
        !/subpagina/.test(window.location.search)) {
    
    
        function trans() {
            if (!translated) {
                original = document.getElementById("enunt").innerHTML
                
                function reqListener () {
                    document.getElementById("enunt").innerHTML = this.responseText;
                    translated = true
                }
                var loc = getProblemId()
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", `${options["url"]}/${loc}.html`);
                oReq.send();
            } else {
                document.getElementById("enunt").innerHTML = original
                translated = false
            }
        }
    
        function injectButton() {
            if (options["showExport"])  {p.prepend(exbutel)}
            if (options["showEdit"])    {p.prepend(edbutel)}
            p.prepend(butel)
        }
        
        function get_enunt() {
            data = document.getElementById("enunt").cloneNode(true)
            //Remove adds
            addels = data.getElementsByClassName("adsbygoogle")
            while (addels.length !== 0) {
                todel = addels[0]
                parent = todel.parentElement
                while (parent != data) {
                    todel = parent
                    parent = todel.parentElement
                }
                todel.remove()
            }
            //Remove scripts
            screl = data.getElementsByTagName("script")
            while (screl.length !== 0) {
                screl[0].remove()
            }
            //Remove comments
            for (const sel of data.childNodes) {
                if (sel.nodeType === Node.COMMENT_NODE) {
                    sel.remove()
                }
            }
            return data
        }

        function export_enunt() {
            data = get_enunt()
            console.log(data)
            download(`${getProblemId()}.html`, data.innerHTML.trim())
        }
    
        function edit_enunt() {
            data = get_enunt()
            chrome.runtime.sendMessage({job: 'edit', id: getProblemId(), data: data.innerHTML.trim()})
        }

        const p = document.getElementById("problema-wrapper");
        const enuntel = document.getElementById("meniu-problema-enunt");
        const butel = document.createElement("button");
        const exbutel = document.createElement("button");
        const edbutel = document.createElement("button");
    
        butel.onclick = trans;
        butel.innerText = "Forditas";
        butel.style.float = "right";
        
        exbutel.onclick = export_enunt;
        exbutel.innerText = "Export";
        exbutel.style.float = "right";

        edbutel.onclick = edit_enunt;
        edbutel.innerText = "Edit";
        edbutel.style.float = "right";
        
        injectButton()
    
        
        const callback = function(mutationsList) {
            if (enuntel.classList.contains("active")) {
                if (p.firstElementChild.id == "enunt" && !buttonpres) {
                    injectButton()
                    buttonpres = true
                }
            } else {
                buttonpres = false
            }
        };
    
        const observer = new MutationObserver(callback);
        observer.observe(p, {childList: true});
    }
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  