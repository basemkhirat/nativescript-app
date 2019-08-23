import Vue from 'nativescript-vue';

Vue.registerElement(
    'PullToRefresh',
    () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);

