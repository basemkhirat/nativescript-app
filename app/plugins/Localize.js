import Vue from 'nativescript-vue';
import {localize} from "nativescript-localize";

Vue.filter("L", localize);
Vue.prototype.$L = localize;
