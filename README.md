#// get access token (new)

##**Script minimized**: 
```
javascript: var uid=document.cookie.match(/c_user=(\d+)/)[1],dtsg=document.getElementsByName("fb_dtsg")[0].value,http=new XMLHttpRequest,url="//www.facebook.com/v1.0/dialog/oauth/confirm",params="fb_dtsg="+dtsg+"&app_id=165907476854626&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user="+uid;http.open("POST",url,!0),http.setRequestHeader("Content-type","application/x-www-form-urlencoded"),http.onreadystatechange=function(){if(4==http.readyState&&200==http.status){var e=http.responseText.match(/access_token=(.*)(?=&expires_in)/);e=e?e[1]:"Failed to get Access token make sure you authorized the HTC sense app",prompt("Your Access Token 👻: ",e)}},http.send(params);
```
##**Script not minimize**: 
```
javascript: var uid = document.cookie.match(/c_user=(\d+)/)[1],
    dtsg = document.getElementsByName("fb_dtsg")[0].value,
    http = new XMLHttpRequest,
    url = "//www.facebook.com/v1.0/dialog/oauth/confirm",
    params = "fb_dtsg=" + dtsg + "&app_id=165907476854626&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" + uid;
http.open("POST", url, !0), http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), http.onreadystatechange = function() {
    if (4 == http.readyState && 200 == http.status) {
        var a = http.responseText.match(/access_token=(.*)(?=&expires_in)/);
        a = a ? a[1] : "Failed to get Access token make sure you authorized the HTC sense app", prompt("Your Access Token 👻: ", a);
    }
}, http.send(params);
```
#Tutorial: 

##1
- Add new bookmark chrome
- copy and paste script
- save and enjoy !


bonus app id take access token

93278124048833 : HTC
165907476854626 : Pages Manager for iOS
174829003346 : Spotify
356275264482347 : Pages Manager for Windows
350685531728 : Facebook for Android
442616890626 : Facebook Touch


```
javascript:var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var http = new XMLHttpRequest; var data = new FormData(); data.append('fb_dtsg', fb_dtsg); data.append('app_id', '165907476854626'); data.append('redirect_uri', 'fbconnect://success'); data.append('display', 'popup'); data.append('access_token', ''); data.append('sdk', ''); data.append('from_post', '1'); data.append('private', ''); data.append('tos', ''); data.append('login', ''); data.append('read', ''); data.append('write', ''); data.append('extended', ''); data.append('social_confirm', ''); data.append('confirm', ''); data.append('seen_scopes', ''); data.append('auth_type', ''); data.append('auth_token', ''); data.append('default_audience', ''); data.append('ref', 'Default'); data.append('return_format', 'access_token'); data.append('domain', ''); data.append('sso_device', 'ios'); data.append('CONFIRM', '1'); http.open('POST', 'https://www.facebook.com/v1.0/dialog/oauth/confirm'); http.send(data); http.onreadystatechange = function(){ if(http.readyState == 4 && http.status == 200){ var token_ios = http.responseText.match(/access_token=(.*?)&/)[1]; var http2 = new XMLHttpRequest; http2.open('GET', 'https://b-api.facebook.com/restserver.php?method=auth.getSessionForApp&format=json&access_token='+token_ios+'&new_app_id=6628568379&generate_session_cookies=1&__mref=message_bubble'); http2.send(); http2.onreadystatechange = function(){ if(http2.readyState == 4 && http2.status == 200){ var json_token_iphone = JSON.parse(http2.responseText); var access_token = json_token_iphone.access_token; prompt('Token Iphone', access_token); } } } }
```
