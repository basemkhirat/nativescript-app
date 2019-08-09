import axios from "axios";
import store from '~/store'

import event from '~/resources/event';
import auth from '~/resources/auth';
import block from '~/resources/block';
import category from '~/resources/category';
import post from '~/resources/post';
import user from '~/resources/user';
import weather from '~/resources/weather';
import tag from '~/resources/tag';
import page from '~/resources/page';
import newsletter from '~/resources/newsletter';
import place from '~/resources/place';

const instance = axios.create({
    baseURL: 'https://cmsjs.dotdev.ae/api',
     timeout: 2
});

instance.interceptors.request.use(function (request) {

    request.headers["Authorization"] = "Bearer " + store.getters.token;
    request.headers["accept-language"] = store.getters.locale;

    let payload = {};

    if (request.data) {
        payload = request.data;
    }

    if (request.params) {
        payload = request.params;
    }

    console.log("Request: " + request.method.toUpperCase() + " " + request.url, JSON.stringify(payload));

    return request;
});

instance.interceptors.response.use(response => {
    console.log("Response: " + response.config.method.toUpperCase() + " " + response.config.url + " " + response.status);
    return response;
})

let resource = {
    auth,
    event,
    block,
    category,
    post,
    weather,
    user,
    tag,
    newsletter,
    page,
    place
};

let rs = {};

for (let r in resource) {
    rs[r] = new resource[r](instance)
}

export default rs;
