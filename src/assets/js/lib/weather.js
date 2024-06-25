function requestGet(url, callback, id, gen) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(id, request.responseText, gen)
        }
    };
    request.open('GET', url);
    request.send()
}

function requestPost(url, callback, params, id) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(request.responseText, id)
        }
    };
    request.open('POST', url, !0);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(params)
}

function getDataFromApi(id, i, gen) {
    var v = document.getElementById(id).getAttribute("v");
    var a = document.getElementById(id).getAttribute("a");
    var l = document.getElementById(id).getAttribute("loc");
    var u = document.getElementById(id + '_u').getAttribute("href") + '|||' + document.getElementById(id + '_u').innerHTML;
    if (gen == 1) {
        var ub = ''
    } else {
        var ub = document.getElementById(id).innerHTML
    }
    var i = i;
    var g = gen;
    var params = 'v=' + v + '&a=' + a + '&l=' + l + '&u=' + u + '&ub=' + ub + '&i=' + i + '&g=' + g + '&id=' + id;
    requestPost('https://app2.weatherwidget.org/data/', updateOnPage, params, id)
}

function collectData(id, gen) {
    if (document.getElementById(id).getAttribute("loc") === 'auto') {
        requestGet('https://ip.weatherwidget.org/', getDataFromApi, id, gen)
    } else {
        getDataFromApi(id, !1, gen)
    }
}

function updateOnPage(data, id) {
    if (typeof JSON.parse === "undefined") {
        data = JSON.decode(data)
    } else {
        data = JSON.parse(data)
    }
    if (data.hasOwnProperty("a")) {
        if (data.a.hasOwnProperty("html")) {
            document.getElementById(id).innerHTML = data.a.html
        }
        if (data.a.hasOwnProperty("style")) {
            document.getElementById(id).style.cssText = data.a.style
        }
        if (data.a.hasOwnProperty("jsCode")) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.async = !1;
            script.text = data.a.jsCode;
            document.getElementsByTagName('head')[0].appendChild(script)
        }
        if (data.a.hasOwnProperty("ub")) {
            document.getElementById(id + '_info_box_inner').innerHTML = data.a.ub;
            updateInfobox(id, data.a.ub);
            loadingToggle(id, 2)
        }
    } else if (data.hasOwnProperty("error_code")) {
        document.getElementById(id).innerHTML = '';
        console.log('weatherwidget.org / Error: ' + data.error_msg + ' (Error code ' + data.error_code + ')')
    }
}

function updateWidget(id, gen) {
    if (gen === 1) {
        loadingToggle(id, 1)
    }
    collectData(id, gen)
}


export {updateWidget};