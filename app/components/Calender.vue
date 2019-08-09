<template>
    <Label class="fa calender" @tap="create" text.decode="&#xf271;"/>
</template>

<style lang="scss" scoped>

    .calender {
        color: #393939;
        font-size: 20;
    }

</style>

<script>

    var Calendar = require('nativescript-calendar');
    import Toast from 'nativescript-toasts'
    import L from 'nativescript-localize';

    export default {

        props: {
            event: {
                type: Object
            }
        },

        methods: {

            create() {

                let vm = this;

                // Only the `title`, `startDate` and `endDate` are mandatory, so this would suffice:

                let options = {
                    title: this.event.title,
                    // Make sure these are valid JavaScript Date objects.
                    // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
                    //startDate: new Date(new Date().getTime() + (60 * 60 * 1000)),
                    //endDate: new Date(new Date().getTime() + (2 * 60 * 60 * 1000))
                    startDate: new Date(new Date(this.event.scheduled_at).getTime()),
                    endDate: new Date(new Date(this.event.scheduled_at).getTime() + (2 * 60 * 60 * 1000)),
                    //endDate: new Date(new Date(this.event.scheduled_at).getTime() + (2 * 60 * 60 * 1000))
                };

                // You can however add lots of properties to enrich the Event:
                options.location = this.event.address;
                options.notes = this.event.excerpt;

                // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field.
                options.url = this.event.url;

                // You can also override the default reminder(s) of the Calendar (in minutes):
                options.reminders = {
                    first: 30,
                    second: 10
                };

                // You can make this Event recurring (this one repeats every other day for 10 days):
                // options.recurrence = {
                //     frequency: "daily", // daily | weekly | monthly | yearly
                //     interval: 2, // once every 2 days
                //     endDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)) // 10 days
                // };

                // Want to use a custom calendar for your app? Pass in the 'name'.
                // If the name doesn't yet exist the plugin will create it for you.
                options.calendar = {
                    name: "Event Calender",
                    // the color, in this case red
                    color: "#FF0000",
                    // Can be used on Android to group the calendars. Examples: Your app name, or an emailaddress
                    accountName: "Nor"
                };

                Calendar.createEvent(options)
                    .then(
                        createdId => {

                            Toast.show({
                                text: L("event_added"),
                                duration: Toast.DURATION.SHORT,
                                position: Toast.POSITION.BOTTOM
                            });

                            this.$emit("added", createdId);
                        },
                        error => {
                            this.$emit("error", error);
                        }
                    );
            }
        }

    }

</script>
