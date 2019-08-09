import Resource from './resource';
import moment from 'moment';

export default class extends Resource {

    name = "weather";

    model(day) {

        day.temperature = parseInt(day.temp.day);
        day.icon = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
        day.description = day.weather[0].description;
        day.day = moment.unix(day.dt).locale("en").format("Do");
        day.today = moment.unix(day.dt).format("dddd");
        day.month = moment.unix(day.dt).format("MMM");
        day.time = moment.unix(day.dt).format("LT");

        return day;
    }
}
