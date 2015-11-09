// Code goes here

var bookmarklet = function(roleName, account, displayName, color) {
  if (window.AWSC == undefined || window.AWSC.Auth == undefined) {
    alert('Please go to the AWS Console to use this bookmark.');
    return;
  }
  var p = {
    "roleName": roleName,
    "account": account,
    "displayName": displayName,
    "color": color,
    "action": "switchFromBasis",
    "src": "nav",
    "mfaNeeded": 0,
    "csrf": window.AWSC.Auth.getMbtc(),
    "redirect_uri": escape(window.location.href)
  };
  var f = document.createElement("form");
  f.setAttribute("method", "post");
  f.setAttribute("action", "https://signin.aws.amazon.com/switchrole");
  for (var k in p) {
    if (p.hasOwnProperty(k)) {
      var i = document.createElement("input");
      i.setAttribute("type", "hidden");
      i.setAttribute("name", k);
      i.setAttribute("value", p[k]);
      f.appendChild(i);
    }
  }
  document.body.appendChild(f);
  f.submit();
}

function gen(roleName, account, displayName, color) {
  var code = '(' + bookmarklet + ')("' + roleName + '","' + account + '","' + displayName + '","' + color + '")';
  var href = 'javascript:' + escape(code.replace(/\s+/g, ' '));
  
  var textnode = document.createTextNode(displayName);
  
  var node = document.createElement("a");
  node.setAttribute("href", href);
  node.appendChild(textnode);
  node.setAttribute("class", "bookmarklet");
  node.setAttribute("style", "background-color: #" + color + ";");
  
  var linkContainer = document.getElementById("linkContainer");
  linkContainer.innerHTML = '';
  linkContainer.appendChild(node);
}