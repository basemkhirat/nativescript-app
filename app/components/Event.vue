<template>

    <GridLayout rows="auto,auto" class="event-card">

        <StackLayout row="0" class="card-cover">

            <StackLayout class="card-cover-image" v-if="event.media" :backgroundImage="event.media.thumbnails.large"
                         @tap="openDetails"></StackLayout>
            <StackLayout class="card-cover-image-default" v-if="!event.media" backgroundImage="~/assets/default/event.png"
                         @tap="openDetails"></StackLayout>

        </StackLayout>

        <FlexboxLayout row="0" class="event-card-ctrl">
            <Like class="btn-like" :event="event"/>
            <Calender class="btn-calender" :event="event"/>
            <Share class="btn-share" :event="event"/>
        </FlexboxLayout>

        <StackLayout row="0" class="event-card-status" v-if="event.status==0">
            <Label class="status-label" :text="'not_published' | L"></Label>
        </StackLayout>

        <GridLayout row="1" class="event-details" rows="100" columns="*, 79">

            <FlexboxLayout flexDirection="column" justifyContent="space-between" col="0" class="main-details">

                <Label class="title" :text="event.title" @tap="openDetails"/>

                <StackLayout horizontalAlignment="right" orientation="horizontal" v-if="event.scheduled_at">
                    <Label class="time" :text="event.time"/>
                    <Label class="fa" text.decode=" &#xf017;"/>
                </StackLayout>

                <StackLayout horizontalAlignment="right" orientation="horizontal" v-if="event.address">
                    <Label class="address" :text="event.address"/>
                    <Label class="fa" text.decode=" &#xf041;"/>
                </StackLayout>

            </FlexboxLayout>

            <FlexboxLayout flexDirection="column" justifyContent="space-between" v-if="event.scheduled_at" col="1"
                           class="side-details">
                <Label class="today" :text="event.today"/>
                <Label class="day" :text="event.day"/>
                <Label class="month" :text="event.month"/>
            </FlexboxLayout>

        </GridLayout>


    </GridLayout>

</template>

<script>

    import Like from '~/components/Like';
    import Share from '~/components/Share';
    import Calender from '~/components/Calender';

    export default {

        props: ["event"],

        methods: {
            openDetails() {
                this.$navigateTo(this.$routes.Event, {
                    props: {
                        event: this.event
                    }
                });
            }
        },

        components: {
            Like,
            Calender,
            Share
        }
    }

</script>
