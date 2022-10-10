// ==UserScript==
// @name         github enhanced
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  github enhanced
// @author       Ybw
// @match       https://github.com/*/*/blob/*/*
// ==/UserScript==

(function() {
  buttons = document.querySelectorAll(".BtnGroup")[1] // 就是显示starts的位置
  // get raw url (read content of the 'Raw button') 
  rawUrl = document.querySelectorAll(".js-permalink-replaceable-link.btn-sm.btn.BtnGroup-item")[2].href
  let scheme, _, host, author, repo, type, branch, rest
  [scheme, _, host, author, repo, type, branch, ...rest] = ['https:', '', 'github.com', 'shellphish', 'how2heap', 'raw', 'master', 'glibc_2.31', 'house_of_spirit.c']
  historyUrl = "https://" + ["github.githistory.xyz", author, repo, "blob", branch, ...rest].join("/")
  let el = document.createElement('a')

  el.className = "js-permalink-replaceable-link btn-sm btn BtnGroup-item"
  el.textContent = "RawLink"
  el.addEventListener('click', _ => {
    navigator.clipboard.writeText(rawUrl)
  })
  el.style = "color: #025eeac2; background-color: #d8eb96"
  buttons.appendChild(el)

  el = document.createElement('a')
  el.className = "js-permalink-replaceable-link btn-sm btn BtnGroup-item"
  el.textContent = "open in git history"
  el.href = historyUrl
  el.style = "color: #025eeac2; background-color: #d8eb96"
  buttons.appendChild(el)

  // add a history button
  // https://github.com/shellphish/how2heap/raw/master/glibc_2.31/house_of_spirit.c
  // https://github.githistory.xyz/shellphish/how2heap/blob/master/glibc_2.31/house_of_spirit.c
})();
