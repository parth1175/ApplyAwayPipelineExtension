// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

let valueURL = document.getElementById("url");
let submitButton = document.getElementById("submitURL");
let url;


// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;
    document.getElementById('url').value = url;
    // use `url` here inside the callback because it's asynchronous!
});

// When the button is clicked, inject setPageBackgroundColor into current page

// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// The body of this function will be executed as a content script inside the
// current page

// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

function myAlert(){
  // alert('Button Clicked');
  // let text1 = "{'name': ";
  // let text2 = document.getElementById('url').value;
  // let text3 = "}";
  // let data1 = text1.concat(text2);
  // let data2 = data1.concat(text3);

  // let data2 = "{'name': 'https://zoom.com'}"
  // console.log(data2);
  // url = "https://apply-away2.herokuapp.com/movies";
  // fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: data2});

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
  alert('submitted! Thanks');
}

// function autoFill(){
//   document.getElementById('url').value = url;
// }
console.log("hello");

document.addEventListener('DOMContentLoaded', function () {
document.getElementById('submitURL').addEventListener('click', myAlert);
});
