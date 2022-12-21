TIMEOUT = 2000

function showMessage(msg, duration)
{
  var el = document.createElement("div");
  el.setAttribute("style","position:fixed;top:40%;left:40%;z-index:99;padding:4px;font-family: Arial, sans-serif;font-size:18px;color:white;background-color:blue; opacity:0.7;");
  el.innerHTML = msg;
  setTimeout(function() {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function biliUrlTransfer(url, currUrlParams, t) {
    newUrlParams = new URLSearchParams()
    // 分p支持
    if (currUrlParams.get('p')) {
        newUrlParams.set('p', currUrlParams.get('p'))
    }
    newUrlParams.set('t', t)
    regex = /https:\/\/www.bilibili.com\/video\/[a-zA-Z0-9]+[\/]?/g
    result = url.match(regex)[0] +'?'+ newUrlParams.toString()
    return result
}

function youtubeUrlTransfer(url, currUrlParams, t) {
    currUrlParams.set('t', t)
    urlWithoutParams = url.split('?')[0]
    res = urlWithoutParams + '?' + currUrlParams.toString()
    return res
}

function main () {
    url = window.location.href
    queryString = window.location.search
    currUrlParams = new URLSearchParams(queryString)
    if (url.match(/https:\/\/www.bilibili.com\//g)) {
        URLtransfer = biliUrlTransfer
        toolbarSelector = "#arc_toolbar_report > div.toolbar-left"
    } else if (url.match(/https:\/\/www.youtube.com\//g)) {
        URLtransfer = youtubeUrlTransfer
        toolbarSelector = "#top-level-buttons-computed"
    } else {
        console.log("ERROR 123")
    }
    let el = document.createElement('button')
    el.textContent = "t-link"
    el.addEventListener('click', _ => {
        var someVideo = $("video")[0]
        // 获得当前视频的时间
        t = someVideo.currentTime >> 0

        result = URLtransfer(url, currUrlParams, t)
        copyText(result)
        showMessage("copied t-link", 700)
    })
    el.style = "color: #025eeac2; background-color: #d8eb96"
    var someToolbar = $(toolbarSelector)[0]
    someToolbar.appendChild(el)

    function copyText(text) {
        var input = document.createElement('input');
        input.setAttribute('id', 'input_for_copyText');
        input.value = text;
        document.getElementsByTagName('body')[0].appendChild(input);
        document.getElementById('input_for_copyText').select();
        document.execCommand('copy');
        document.getElementById('input_for_copyText').remove();
    };
}
(function() {
    setTimeout(() => {
        main()
    }, TIMEOUT)
})();
