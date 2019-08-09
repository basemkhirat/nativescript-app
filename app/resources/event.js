import Resource from "./resource";
import moment from 'moment';

export default class extends Resource {

    name = "event";

    model(event) {

        if (event.object) {
            event = event.object;
        }
        if (event.event) {
            event = event.event;
        }

        event.url = "https://nor.dotdev.ae/events/" + event.slug;

        if (event.place) {
            event.address = event.place.name;
            if (event.place.parent) {
                event.address = event.address + " - " + event.place.parent.name;
                if (event.place.parent.parent) {
                    event.address =
                        event.address + " - " + event.place.parent.parent.name;
                }
            }
        }

        event.eventType =
            event.type === "paid" && event.price !== undefined
                ? event.currency + event.price
                : "مجاناً";

        event.time = moment(event.scheduled_at).format("h:mm a");
        event.month = moment(event.scheduled_at).format("MMMM");
        event.day = moment(event.scheduled_at)
            .locale("en")
            .format("D");
        event.today = moment(event.scheduled_at).format("dddd");
        event.year = moment(event.scheduled_at).format("YYYY");
        if (event.scheduled_at) {
            event.time = moment(event.scheduled_at).format("h:mm a");
            event.month = moment(event.scheduled_at).format("MMMM");
            event.day = moment(event.scheduled_at)
                .locale("en")
                .format("D");
            event.today = moment(event.scheduled_at).format("dddd");
        }

        return event;
    }
}
