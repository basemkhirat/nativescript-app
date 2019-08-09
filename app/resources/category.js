import Resource from './resource';
import moment from 'moment';

export default class extends Resource {

    name = "category";


    model(category) {

        // add custom attribute.

        category.events_url = "/category/" + category.slug + "/events";

        category.news_url = "/category/" + category.slug + "/news";

        category.default_image = "/default/category.png";

        // add custom method

        // category.date = (format) => {
        //     return moment(category.created_at).format(format);
        // };

        return category;
    }

}
