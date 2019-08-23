import Vue from 'nativescript-vue';
import {Video} from 'nativescript-videoplayer';

Vue.registerElement(
    "VideoPlayer",
    () => Video
);
