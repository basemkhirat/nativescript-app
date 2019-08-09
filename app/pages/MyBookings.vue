<template>
    <Page class="page">

        <Navbar :hasBack="true"/>

        <StackLayout>

            <FlexboxLayout class="my-page-header">
                <Label class="my-page-header-image fa" text.decode="&#xf004;"></Label>
                <Label class="my-page-header-email" :text="'my_bookings'| L"></Label>
            </FlexboxLayout>

            <Events :isBooked="true"></Events>

        </StackLayout>

    </Page>
</template>

<script>

    import Events from "~/components/Events";

    export default {
        components: {Events}
    };
</script>
