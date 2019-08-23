import * as app from 'tns-core-modules/application';
import * as platform from 'tns-core-modules/platform'
import * as color from 'tns-core-modules/color'

if (app.android) {

    app.on(app.displayedEvent, function (args) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
        if (app.android && platform.device.sdkVersion >= "21") {
            const window = app.android.foregroundActivity.getWindow();
            window.setStatusBarColor(new color.Color("#2c205c").android);
        }
    });

}

export default {

    setColor: (c) => {
        if (app.android && platform.device.sdkVersion >= "21") {
            const window = app.android.foregroundActivity.getWindow();
            window.setStatusBarColor(new color.Color(c).android);
        }
    }

}




