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
