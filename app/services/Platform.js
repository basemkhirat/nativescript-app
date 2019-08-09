const platformModule = require("tns-core-modules/platform");

let platform;

if(platformModule.isIOS){
    platform = "ios";
}

if(platformModule.isAndroid){
    platform = "android";
}

export default platform;
