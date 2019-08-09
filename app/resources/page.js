import Resource from './resource';

export default class extends Resource {

    name = "page";

    model(page) {

        page.url = process.env.APP_URL + "/page/" + page.slug;

        return page;
    }

}
