/*
Citation Generator
https://cite.mickschroeder.com

MIT License
Copyright (c) 2020 Mick Schroeder
*/


// This helps avoid conflicts in case we inject 
// this script on the same page multiple times
// without reloading.
var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

// Return citation data we can find on the current webpage
methods.getCitationData = function(){
  
  // Get all the meta tag nodes on a page
  var nodes = document.getElementsByTagName("meta");
  
  // Instantiate variables we'll use later
  var node, nodeName, citationQuery, i;

  if (nodes) {
   // Loop through all the nodes
    for (i = 0; i < nodes.length; i++) {
      // The current node
      node = nodes[i];
      
      // The name attribute of the meta tag
      nameName = node.getAttribute("name");

      if (nameName && nameName.indexOf('pmid') >= 0){
      // Found pubmed ID
          citationQuery = node.getAttribute("content");
          break;
      }
      else if (nameName && nameName.indexOf('doi') >= 0){
      // Found DOI
          citationQuery = node.getAttribute("content");
          break;
      }
    }
  }

  // if we didn't find any useful metadata set the query to the page url
  if (!citationQuery) {
    citationQuery = document.URL;
  }

  // return the query
  return citationQuery;
}
  // This tells the script to listen for
  // messages from our extension.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    // If the method the extension has requested
    // exists, call it and assign its response
    // to data.
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    // Send the response back to our extension.
    sendResponse({ data: data });
    return true;
  });

  return true;
})();