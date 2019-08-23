import Vue from 'nativescript-vue';
import * as application from "tns-core-modules/application";
import * as imageCache from 'nativescript-web-image-cache';

Vue.registerElement('WebImage', () => imageCache.WebImage);

if(application.android){
    application.on("launch", function () {
        imageCache.initialize();
    });
}
