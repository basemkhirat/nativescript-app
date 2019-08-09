<template>
    <Page class="page">

        <Navbar :title="'my_page' | L" hasBack="true"/>

        <StackLayout>

            <FlexboxLayout v-if="user" class="my-page-header">
                <Label class="my-page-header-image fa" text.decode="&#xf2bd;"></Label>
                <Label class="my-page-header-name" :text="user.name"></Label>
                <Label class="my-page-header-email" :text="user.email"></Label>
            </FlexboxLayout>

            <ScrollView>

                <FlexboxLayout v-if="user" class="my-page-content">

                    <FlexboxLayout class="my-page-block" @tap="$navigateTo($routes.MyLikes)">
                        <Label class="block-image fa" text.decode="&#xf004;"></Label>
                        <Label class="block-title" :text="'my_likes'| L"></Label>
                    </FlexboxLayout>

                    <FlexboxLayout class="my-page-block" @tap="$navigateTo($routes.MyBookings)">
                        <Label class="block-image fa" text.decode="&#xf073;"></Label>
                        <Label class="block-title" :text="'my_bookings'| L"></Label>
                    </FlexboxLayout>

                    <FlexboxLayout class="my-page-block" @tap="$navigateTo($routes.MyEvents)">
                        <Label class="block-image fa" text.decode="&#xf017;"></Label>
                        <Label class="block-title" :text="'my_events'| L"></Label>
                    </FlexboxLayout>

                </FlexboxLayout>

            </ScrollView>

        </StackLayout>

    </Page>
</template>

<script>

    export default {

        computed: {
            user() {
                return this.$store.getters.user
            }
        }

    };
</script>
