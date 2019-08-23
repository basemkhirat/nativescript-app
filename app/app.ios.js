import Vue from "nativescript-vue";
import store from '~/store';
import routes from '~/routes';
import resource from '~/resource';
import Home from "~/pages/Home";
import DrawerContent from "~/components/Drawer";
import Navbar from '~/components/Navbar';

Vue.config.silent = (TNS_ENV === 'production');
Vue.prototype.$routes = routes;
Vue.prototype.$platform = "ios";
Vue.prototype.$resource = resource;
Vue.component("Navbar", Navbar);

import DateTimePicker from '~/plugins/DateTimePicker';
import Localize from '~/plugins/Localize';
import Drawer from '~/plugins/Drawer';
import Facebook from '~/plugins/Facebook';
import FancyAlert from '~/plugins/FancyAlert';
import WebImage from '~/plugins/WebImage';
import VideoPlayer from '~/plugins/VideoPlayer';
import PullToRefresh from '~/plugins/PullToRefresh';
import Moment from '~/plugins/Moment';
import Auth from '~/plugins/Auth';
Auth.configureProviders();


import "~/assets/ios.scss";

new Vue({
    store,
    render(h) {
        return h(
            DrawerContent,
            [
                h(Home, {slot: 'mainContent'})
            ]
        )
    }
}).$start();
