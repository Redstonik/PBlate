var chilDoc;

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

window.onload = function() {
  chilDoc = document.getElementsByTagName('iframe')[0].contentWindow.document
  chrome.storage.local.get(['cur-prob'], function(result) {
    chilDoc.getElementById("con").innerHTML = result["cur-prob"]["data"]
    chilDoc.designMode = "on"
    document.getElementById("exportbtn").onclick = function () {
      download(`${result["cur-prob"]["id"]}.html`, chilDoc.getElementById("con").innerHTML.trim())
    }
  });
}