// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

let valueURL = document.getElementById("url");
let submitButton = document.getElementById("submitURL");
let url;
let id;


// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;
    document.getElementById('url').value = url;
    // use `url` here inside the callback because it's asynchronous!
});


// function htmlInject(){
//   var message = document.querySelector('#message');
//
//   chrome.scripting.executeScript(null, {
//     file: "getPagesSource.js"
//   }, function() {
//     // If you try and inject into an extensions page or the webstore/NTP you'll get an error
//     if (chrome.runtime.lastError) {
//       message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
//     }
//   });
// }

function getTabId(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      id = tabs[0].id;
  });
  return id;
}

const tabID = getTabId();


function myAlert(){

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://apply-away2.herokuapp.com/movies");
  // xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }};

  let data = `{
    "name": "${url}"
  }`;
  xhr.send(data);

  const tabID = getTabId();

  var message = document.querySelector('#message');
  chrome.scripting.executeScript({
    target: {tabId:tabID},
    files: ["getPagesSource.js"],
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
    // else{
    //   message.innerText =
    // }
  });

  alert('submitted! Thanks');
}


console.log("hello");

document.addEventListener('DOMContentLoaded', function () {
document.getElementById('submitURL').addEventListener('click', myAlert);
// window.onload = myAlert;

});
