import Resource from './resource';

export default class extends Resource {

    name = "user";

    model(user) {

        user.photo_url = typeof user.photo == "object" ? user.photo.thumbnails.medium : "/default/user.jpeg";

        return user;
    }
}
