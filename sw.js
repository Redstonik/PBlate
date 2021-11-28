chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.job === "edit") {
      chrome.storage.local.set({'cur-prob': {id: request.id, data:request.data}}, function() {
        chrome.tabs.create(
          {url: "editor/editor.html"}
        ) 
      });
    }
  }
);