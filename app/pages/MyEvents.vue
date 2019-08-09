<template>
    <Page class="page">

        <Navbar :hasBack="true"/>

        <StackLayout>

            <FlexboxLayout class="my-page-header">
                <Label class="my-page-header-image fa" text.decode="&#xf017;"></Label>
                <Label class="my-page-header-email" :text="'my_events'| L"></Label>
            </FlexboxLayout>

            <Events :user="user.id" :status="-1"></Events>

        </StackLayout>

    </Page>
</template>

<script>

    import Events from "~/components/Events";

    export default {

        components: {Events},

        computed: {
            user() {
                return this.$store.getters.user;
            }
        }
    };
</script>
