<template>

    <Page class="page home-page" @loaded="loaded">

        <Navbar>
            <ActionItem horizontalAlignment="right"   @tap="activateSearch">
                <button class="fa" text.decode="&#xf002;" :class="{active: search_mode}"/>
            </ActionItem>
        </Navbar>


        <GridLayout class="page-content" rows="auto, auto, *, 50">

            <SearchBar v-show="search_mode" row="0" v-model="query_string"/>

            <Categories row="1" @changed="activateCategory"></Categories>

<!--            <Button @tap="login" text="Continue with Facebook (Custom)"></Button>-->

            <Events :q="query_string" :categories="category ? [category] : []" row="2"
                    v-show="tab == 'events'"/>
            <Posts :q="query_string" :categories="category ? [category] : []" row="2" v-show="tab == 'posts'"/>

            <FlexBoxLayout row="3" class="tabs">
                <Label ref="post_tab" class="fa tab" :class="{active: tab == 'posts'}"
                        @tap="activateTab('posts')"
                        text.decode="&#xf1ea;"/>
                <Label class="fa tab" :class="{active: tab == 'events'}" @tap="activateTab('events')"
                        text.decode="&#xf073;"/>
            </FlexBoxLayout>

        </GridLayout>

    </Page>

</template>

<script>

    import Events from '~/components/Events';
    import Posts from '~/components/Posts';
    import Categories from '~/components/Categories';
    import Auth from "~/plugins/Auth";

    export default {

        props: {
            view: {
                type: String,
                default: "events"
            },
            q: "String"
        },

        data() {
            return {
                tab: this.view,
                category: false,
                query_string: this.q
            }
        },

        computed: {
            user() {
                return this.$store.getters.user;
            },
            search_mode() {
                return this.$store.getters.search_mode;
            }
        },

        methods: {

            login: function() {

                Auth.login("facebook", (error, token) => {
                    if(error){
                        console.log("Error: " + error);
                    }

                    console.log(token);
                });
            },

            loaded(){
                // app loaded
            },

            activateTab(tab) {
                this.tab = tab;
            },

            activateCategory(category) {
                this.category = category.id;
            },

            activateSearch() {
                this.$store.commit("search_mode", !this.$store.getters.search_mode);
            }
        },

        components: {
            Posts,
            Events,
            Categories
        },

    };
</script>



