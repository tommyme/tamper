// ==UserScript==
// @name         bilibili-快捷键增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  bilibili 快捷键增强
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
  document.addEventListener("keydown", e =>{
    console.log(e.key.toLowerCase());
    switch (e.key.toLowerCase()) {
      case "n":
        // open note
        $(".note-btn").click()
        break
      case "t":
        // make time tag in note
        $(".ql-tag-btn").click()
        break
      case "\\":
        // toggle wide screen mode
        $(".bilibili-player-iconfont-widescreen-off").click()
        break
      case "-":
        // toggle top bar visibility
        if ($("#biliMainHeader").attr("style").includes("display: none")) {
          $("#biliMainHeader").show()
        } else {
          $("#biliMainHeader").hide()
        }
        break
    }
  })
})();