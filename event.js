/*
Citation Generator
http://www.mickschroeder.com/citation

Made by Mick Schroeder
*/


// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

// Get background-color values from the current tab
// and open them in Colorpeek.
function getCitationData (tab) {

  injectedMethod(tab, 'getCitationData', function (response) {
    var query = encodeURIComponent(response.data);

    console.log(query);
    
    if (query && query.length) {
      var url = 'https://cite.mickschroeder.com/?q=' + query + "&utm_source=chrome&utm_medium=chrome&utm_campaign=chrome";
      chrome.tabs.create({ url: url });
    } else {
      alert('Error! :(');
    }
    return true;
  })
}

// When the browser action is clicked, call the
// getCitationData function.
chrome.browserAction.onClicked.addListener(getCitationData);