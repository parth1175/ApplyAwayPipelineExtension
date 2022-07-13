// Initialize button with user's preferred color
// import 'object-sizeof' as sizeof
// var sizeof = require('object-sizeof')

let changeColor = document.getElementById("changeColor");

let username = "test33"
let valueURL = document.getElementById("url");
let submitButton = document.getElementById("submitURL");
let url;
let id;
let data;
let x;
let y;
let html;


const getSizeInBytes = obj => {
  let str = null;
  if (typeof obj === 'string') {
    // If obj is a string, then use it
    str = obj;
  } else {
    // Else, make obj into a string
    str = JSON.stringify(obj);
  }
  // Get the length of the Uint8Array
  const bytes = new TextEncoder().encode(str).length;
  return bytes;
};

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;
    document.getElementById('url').value = url;
});

// // let html;
// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "getSource") {
//     // message.innerText = request.source;
//     html = request.source;
//     message.innerText = "hello there bitches";
//     // url = sizeof(request.source).toString()
//     // html = message.innerText;
//     // html = request.source;
//   }
// });

function getTabId(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      id = tabs[0].id;
  });
  return id;
}
const tabID = getTabId();


function myAlert(){
  const tabID = getTabId();
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://apply-away2.herokuapp.com/movies");

  // const tabID = getTabId();

  // chrome.scripting.executeScript(
  //   {
  //   target: {tabId:tabID},
  //   files: ["getPagesSource.js"],
  //   },
  //   (injectionResults) =>
  //   {
  //
  //     /////////////////////////////////
  //     // 1. Send the background a message requesting the user's data
  //     chrome.runtime.sendMessage('get-user-data', (response) => {
  //       // 3. Got an asynchronous response with the data from the background
  //       html = response;
  //     });
  //     ////////////////////////////////
  //     let x = html;
  //     let y = x.substr(1,10);
  //     data = x;
  //     data = url + "\n" + x;
  //
  //     xhr.setRequestHeader("Content-Type", "text/html");
  //     xhr.setRequestHeader("charset", "utf-8");
  //
  //     xhr.send(data);
  //   }
  // );

  chrome.scripting.executeScript(
    {
    target: {tabId:tabID},
    files: ["getPagesSource.js"],
    }
  // (injectionResults) =>
  //   {
  //     html = DOMtoString(document);
  //     let x = html;
  //     let y = x.substr(1,10);
  //     data = x;
  //     data = url + "\n" + x;
  //
  //     xhr.setRequestHeader("Content-Type", "text/html");
  //     xhr.setRequestHeader("charset", "utf-8");
  //
  //     xhr.send(data);
  //   }
  );

  // chrome.runtime.sendMessage('get-user-data', (response) => {
  //   // 3. Got an asynchronous response with the data from the background
  //   console.log(response);
  //   html = response;
  //   let x = html;
  //   let y = x.substr(1,10);
  //   data = x;
  //   data = url + "\n" + x;
  //
  //   xhr.setRequestHeader("Content-Type", "text/html");
  //   xhr.setRequestHeader("charset", "utf-8");
  //
  //   xhr.send(data);
  // });

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   // 2. A page requested user data, respond with a copy of `user`
  //   console.log("testing 2");
  //   if()
  //   if (message === 'get-user-data') {
  //     console.log("respeonse sent");
  //     // sendResponse(DOMtoString(document));
  //     return true;
  //   }
  // });

  chrome.runtime.onMessage.addListener(async function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
    html = request.source
    x = message.innerText;
    // y = x.substr(1,10);
    y = x.substr(1,10);
    data = x;
    data = username + "\n" + url + "\n" + x;

    // xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.setRequestHeader("charset", "utf-8");

    xhr.send(data);
    return true;
  }
  });


  // x = message.innerText;
  // // y = x.substr(1,10);
  // y = x.substr(1,10);
  // data = x;
  // data = url + "\n" + x;
  //
  // // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.setRequestHeader("Content-Type", "text/html");
  // xhr.setRequestHeader("charset", "utf-8");
  //
  // xhr.send(data);
  alert('submitted! Thanks');

}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submitURL').addEventListener('click', myAlert);
});
