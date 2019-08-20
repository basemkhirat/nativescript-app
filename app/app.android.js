import Vue from "nativescript-vue";

import store from '~/store';
import routes from '~/routes';
import resource from '~/resource';
import Home from "~/pages/Home";
import Drawer from "~/components/Drawer";
import Navbar from '~/components/Navbar';

import Platform from '~/services/Platform';

import "~/assets/android.scss";

// side drawer
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
// localize
import {localize} from "nativescript-localize";
// momentjs
import 'moment/locale/ar';
// datetime picker
import DateTimePicker from "nativescript-datetimepicker/vue";
// fancy alert
import {TNSFancyAlert} from "nativescript-fancyalert";
import {Video} from "nativescript-videoplayer";

Vue.use(RadSideDrawer);

Vue.filter("L", localize);
Vue.prototype.$L = localize;
Vue.prototype.$platform = Platform;

Vue.use(DateTimePicker);


TNSFancyAlert.textDisplayOptions = {
    applyFontToAll: true,
    titleFont: "SST Arabic",
    bodyFont: "SST Arabic",
    buttonFont: "SST Arabic"
};

Vue.registerElement(
    'PullToRefresh',
    () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);

Vue.registerElement(
    "VideoPlayer",
    () => Video
);


var imageCache = require("nativescript-web-image-cache");


Vue.registerElement('WebImage', () => imageCache.WebImage);

import * as application from "tns-core-modules/application";

if(application.android){
    application.on("launch", function () {
        imageCache.initialize();
    });
}

Vue.component("Navbar", Navbar);
Vue.prototype.$routes = routes;
Vue.prototype.$resource = resource;
Vue.config.silent = (TNS_ENV === 'production');
//Vue.config.silent = true;


new Vue({
    store,
    render(h) {
        return h(
            Drawer,
            [
                h(Home, {slot: 'mainContent'})
            ]
        )
    }
}).$start();
