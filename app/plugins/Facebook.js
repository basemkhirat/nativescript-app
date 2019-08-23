import Vue from 'nativescript-vue';
import * as application from 'tns-core-modules/application';
import {init, initAnalytics} from 'nativescript-facebook';
import FacebookPlugin from "nativescript-facebook/vue";

Vue.use(FacebookPlugin);

application.on(application.launchEvent, function (args) {
    init("367149670558681");
    initAnalytics();
});
