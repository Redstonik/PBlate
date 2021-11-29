chrome.storage.local.get(['options'], function(result) {
  options = result.options;
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.job) {
      case "edit":
        chrome.storage.local.set({'cur-prob': {id: request.id, data:request.data}}, function() {
          chrome.tabs.create(
            {url: "editor/editor.html"}
          ) 
        })
        break;
      
      case "get-trans":

        fetch(`${options["url"]}/${request.id}.html`)
        .then(function (response) {
            console.log(response);
            response.text()
            .then(function (text) {
              console.log(text)
              sendResponse(text)
            })
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
        return true;
        
      default:
        break;
    }
  }
);