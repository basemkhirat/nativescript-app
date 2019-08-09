import Resource from './resource';

export default class extends Resource {

    name = "post";

    model(post) {

        post.url = process.env.APP_URL + "/news/" + post.slug;

        return post;
    }

}
