// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});

////////////////////////////////////////////////////////////
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   if (message === 'get-user-data') {
//     sendResponse(DOMtoString(document));
//     return true;
//   }
// });
////////////////////////////////////////////////////////////
// chrome.runtime.sendMessage({greeting: "hello"}, function() {
//   console.log("hello there");
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   console.log("testing 2");
//   if (message === 'get-user-data') {
//     console.log("respeonse sent");
//     sendResponse(DOMtoString(document));
//     // return true;
//   }
// });
////////////////////////////////////////////////////////////


// I need to execute the function in this file.
