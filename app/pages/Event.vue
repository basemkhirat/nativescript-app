<template>
    <Page class="page event-page">

        <Navbar :hasBack="true"/>

        <ScrollView iosOverflowSafeArea="false">

            <StackLayout>

                <StackLayout class="event-image" v-if="e.media">
                    <Image :src="e.media.thumbnails.large"/>
                </StackLayout>

                <flexBoxLayout class="event-ctrl" justifyContent="space-between">
                    <Label class="event-type" :text="e.eventType" />
                    <Calender :event="e"/>
                    <Like :event="e"/>
                    <Share :event="e"/>
                    <Button @tap="$showModal($routes.Book, {fullscreen: true, props: {event}})" class="event-register" :text="'register_event' | L"/>
                </flexBoxLayout>

                <StackLayout class="event-main">

                    <Label class="event-title" :text="e.title"/>

                    <StackLayout class="event-info" horizontalAlignment="center">

                        <Label class="today" :text="e.today"/>
                        <Label class="day" :text="e.day"/>
                        <Label class="month" :text="e.month"/>

                        <StackLayout horizontalAlignment="center" orientation="horizontal" v-if="e.scheduled_at">
                            <Label class="time" :text="e.time"/>
                            <Label class="fa" text.decode=" &#xf017;"/>
                        </StackLayout>

                        <StackLayout horizontalAlignment="center" orientation="horizontal" v-if="e.address">
                            <Label class="address" :text="e.address"/>
                            <Label class="fa" text.decode=" &#xf041;"/>
                        </StackLayout>

                    </StackLayout>

                    <Content :content="e.content" />

                </StackLayout>

            </StackLayout>

        </ScrollView>

    </Page>
</template>

<script>

    import Content from '~/components/Content';
    import Calender from '~/components/Calender';
    import Like from '~/components/Like';
    import Share from '~/components/Share';

    export default {

        props: {
            event: {
                type: Object
            }
        },

        data() {
            return {
                e: this.event,
                loading: false
            }
        },

        watch: {
            event() {
                this.e = this.event;
            }
        },

        created() {
            this.load();
        },

        methods: {

            load() {
                return this.$resource.event.get("/" + this.e.id).then(event => {
                    this.e = this.$resource.event.model(event);
                });
            }
        },
        components: {
            Content,
            Calender,
            Like,
            Share
        }
    };
</script>
