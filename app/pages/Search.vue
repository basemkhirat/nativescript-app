<template>
    <Page class="page">

        <Navbar :title="'search' | L"/>

        <StackLayout>
            <SearchBar v-model="query_string"/>
            <Events :q="query_string"/>
        </StackLayout>
    </Page>
</template>

<script>

    import Events from "~/components/Events";

    export default {

        props: {
            q: String
        },

        data() {
            return {
                query_string: this.q
            }
        },

        components: {
            Events
        }
    };
</script>
