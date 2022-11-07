// 在 IOS 12 中，判断用户是否关闭了动作与方向的访问权限
{
  let timer = setTimeout(() => {
    alert("请开启动作与方向的访问权限，否则将无法使用本应用");
    iosGrantedTips();
  }, 200);
  window.addEventListener("devicemotion", () => {
    clearTimeout(timer);
  }, { once: true });
}
//直接获取调用动作与方向的权限
function iosGrantedTips() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("like mac os x") > 0) {
    var reg = /os [\d._]*/gi;
    var verinfo = ua.match(reg);
    var version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
    var arr = version.split(".");
    $(".aa").text(arr[0] + "." + arr[1] + "." + arr[2])
    if (arr[0] > 12 && arr[1] > 2) {  //对13.3以后的版本处理,包括13.3,

      DeviceMotionEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') { window.addEventListener('devicemotion', () => { }) }
        //
      }).catch((err) => {

        //alert("用户未允许权限")
        //======这里可以防止重复授权，需要改动，因为获取权限需要点击事件才能触发，所以这里可以改成某个提示框===//
        showLayer("由于IOS系统需要手动获取访问动作与方向的权限，为了保证抽奖正常运行，请在访问提示中点击允许！", "", "确定", function (index) {
          ios13granted();
          layer.close(index);
        })
      });

    } else {  //13.3以前的版本 }
    }
  }

}
function ios13granted() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then((permissionState) => {
      if (permissionState === 'granted') {
        window.addEventListener('devicemotion', () => { });
      }
    }).catch((error) => {
      alert(error)
    })
  } else {
    // 处理常规的非iOS 13+设备
    console.log("处理常规的非iOS 13+设备")
  }
}


// 判断当前是否是安卓系统
function isAndroid() {
  const u = window.navigator.userAgent;
  return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
}
/*
  setMotion 设置监听加速变化要处理的事情
  cb 加速度变化后要做的处理函数
  return 取消事件注册
*/
function setMotion(cb) {
  let fn = (e) => {
    if (isAndroid()) { // 处理安卓取反问题
      e.acceleration.x = -e.acceleration.x;
      e.acceleration.y = -e.acceleration.y;
      e.acceleration.z = -e.acceleration.z;
      e.accelerationIncludingGravity.x = -e.accelerationIncludingGravity.x;
      e.accelerationIncludingGravity.y = -e.accelerationIncludingGravity.y;
      e.accelerationIncludingGravity.z = -e.accelerationIncludingGravity.z;
    }
    cb(e);
  };
  // 区分 IOS 13 及之前
  if (typeof DeviceMotionEvent.requestPermission === "function") { // IOS 13 及之后
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          // 权限允许
          window.addEventListener("devicemotion", fn);
        }
      }).catch(() => {
        alert("请开启授权否则无法使用本应用");
      })
  } else { //安卓及IOS 13之前
    window.addEventListener("devicemotion", fn)
  }
  return () => {
    window.removeEventListener("devicemotion", fn);
  }
}