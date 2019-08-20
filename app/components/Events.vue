<template>

    <PullToRefresh iosOverflowSafeArea="false" @refresh="refresh">
        <ScrollView ref="eventsScroll" scrollBarIndicatorVisible="false" @scroll="scroll">
            <StackLayout class="p-15">
                <Empty v-if="!loading && !events.length" :title="'empty_events' | L"/>
                <Event v-for="event in events" :event="event" :key="event.id"/>
                <ActivityIndicator :busy="loading"/>
            </StackLayout>
        </ScrollView>
    </PullToRefresh>

</template>

<script>

    import debounce from 'debounce';
    import Event from '~/components/Event';
    import Empty from '~/components/Empty';

    export default {

        props: {
            q: String,
            categories: Array,
            user: String,
            status: {
                type: Number,
                default: 1
            },
            isLiked: {
                type: Boolean,
                default: false
            },
            isBooked: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                events: [],
                loading: false,
                page: 1,
                query: {
                    q: this.q,
                    limit: 10,
                    categories: this.categories,
                    sort_field: "created_at",
                    sort_direction: "desc",
                    status: this.status >= 0 ? this.status : undefined,
                    user: this.user
                }
            }
        },

        computed: {
            event_should_change() {
                return this.$store.getters.event_should_change;
            },

            events_should_change() {
                return this.$store.getters.events_should_change;
            }
        },

        watch: {

            q() {
                this.query.q = this.q;
            },

            categories() {
                this.query.categories = this.categories;
            },

            events_should_change() {
                this.page = 1;
                this.load()
            },

            event_should_change(e) {
                this.events = this.events.map(event => {
                    if (event.id === e.id) {
                        for (let property in e.data) {
                            event[property] = e.data[property];
                        }

                    }
                    return event;
                });
            },

            query: {
                handler() {

                    this.events = [];

                    this.loading = true;

                    this.page = 1;

                    this.load().then(() => {
                        this.loading = false;
                    });
                },
                deep: true
            }
        },

        created() {

            this.loading = true;

            this.load().then(() => {
                this.loading = false;
            });

        },

        methods: {

            load() {

                let path = "/";

                if (this.isLiked) {
                    path = "/likes/me";
                }

                if (this.isBooked) {
                    path = "/registrations/me";
                }

                let query = this.query;

                query.page = this.page;

                return this.$resource.event.get(path, query).then(events => {

                    if (this.page == 1) {
                        this.events = this.$resource.event.models(events.docs);
                    } else {
                        this.$resource.event.models(events.docs).forEach(event => {
                            this.events.push(event);
                        });
                    }

                });
            },

            refresh(args) {

                this.page = 1;

                this.load().then(() => {
                    args.object.refreshing = false
                });
            },

            scroll: debounce(function () {

                let eventsScroll = this.$refs.eventsScroll.nativeView;

                if (eventsScroll.verticalOffset > eventsScroll.scrollableHeight - 250) {

                    this.loading = true;

                    this.page++;

                    this.load().then(() => {
                        this.loading = false;
                    });
                }

            }, 100)

        },

        components: {
            Event,
            Empty
        }

    }


</script>
