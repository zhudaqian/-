$(function() {
    // var wei = navigator.userAgent.toLowerCase();
    //微信不打开应用
    // if(!(wei.match(/MicroMessenger/i)=="micromessenger")){
    //获取地址栏参数
    var $_GET = (function(){
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if(typeof(u[1]) == "string"){
            u = u[1].split("&");
            var get = {};
            for(var i in u){
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    })();
    var data,string_data;
    var relationtype = $_GET['type'];
    if(relationtype == 1){
        data = {
            type : 11,
            sid: $_GET['id'],
        };
        string_data = 'type='+relationtype+"&sid="+$_GET['id'];
    }
    if(relationtype == 2){
        data = {
            type : 12,
            sid: $_GET['sid'],
            did: $_GET['id'],
            pid: $_GET['pid'],
        };
        string_data = 'type=12&sid='+$_GET['sid']+'&did='+$_GET['id'];
    }
    if(relationtype == 3){
        data = {
            type : 13,
            sid: $_GET['sid'],
            did: $_GET['id'],
        };
        string_data = 'type=13&sid='+$_GET['sid']+'&did='+$_GET['id']+'&pid='+$_GET['pid'];
    }
    //判断设备室iOS还是Android
    var u = navigator.userAgent, app = navigator.appVersion;
    var android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    var iPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1; //为iPhone
    //如果Android设备打开
    if (android) {
        var ua = navigator.userAgent.toLowerCase();
        var t;
        var config = {
            /*scheme:必须*/
            scheme_Adr: "qiaoyuer://splash/?"+string_data,
            download_url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.xywy.qye',
            timeout: 600
        };
        function openclient() {
            var UA = navigator.userAgent.toLowerCase();
            if((UA.indexOf('qqbrowser')>-1)){
                alert("请在其他浏览器打开！");
            }else{
                var startTime = Date.now();
                var ifr = document.createElement('iframe');
                ifr.src = ua.indexOf('os') > 0 ? config.scheme_IOS : config.scheme_Adr;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                var t = setTimeout(function() {
                    var endTime = Date.now();
                    if (!startTime || endTime - startTime < config.timeout + 200) {
                        window.location = config.download_url;
                    } else {
                        window.close();
                    }
                }, config.timeout);
                window.onblur = function() {
                    clearTimeout(t);
                }
            }
        }
        window.addEventListener("DOMContentLoaded", function(){
            document.getElementById("hit").addEventListener('click',openclient,false);
        }, false);
    }

    //iOS苹果设备
    if (iPhone) {
        var appid = '847b4c1f0757677b';
        var params = {
            inapp_data : data,
            channels:["chanName1_chanType1_chanNumber1"],
            sender_id : "senderID",
            download_title : "这一次我们发现更好的育儿",
            download_msg : "这一次我们发现更好的育儿",
        };
        deepshare = new DeepShare(appid);
        deepshare.BindParams(params);
        document.getElementById('hit').addEventListener('click', function() {
            deepshare.Start();  // 开始跳转，调用后将立即跳转到目标（下载页面或APP内部）
        },false);
    }
});
/*用户调整页面大小*/
window.onresize=function(e){
    var dw=$(window).width();  console.log(dw);
    if(dw>=750){
        dw=750;
    }
    var x=100*dw/375;
    $("html").css({"font-size": x+'px'});
};
/*二次分享的*/