<template>

    <PullToRefresh iosOverflowSafeArea="false" @refresh="refresh">
        <ScrollView ref="postsScroll" scrollBarIndicatorVisible="false" @scroll="scroll">
            <StackLayout class="p-15">
                <Empty v-if="!loading && !posts.length" :title="'empty_posts' | L"/>
                <Post v-for="post in posts" :post="post" :key="post.id"/>
                <ActivityIndicator :busy="loading"/>
            </StackLayout>
        </ScrollView>
    </PullToRefresh>

</template>

<script>

    import debounce from 'debounce';
    import Post from '~/components/Post';
    import Empty from '~/components/Empty';


    export default {

        props: {
            q: String,
            page: {
                type: Number,
                default: 1
            },
            categories: Array,
        },

        data() {
            return {
                posts: [],
                loading: false,
                query: {
                    q: this.q,
                    limit: 10,
                    categories: this.categories,
                    sort_field: "created_at",
                    sort_direction: "desc"
                }
            }
        },

        watch: {
            q() {
                this.query.q = this.q;
            },
            categories() {
                this.query.categories = this.categories;
            },
            query: {
                handler() {

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

                let query = this.query;

                query.page = this.page;

                return this.$resource.post.get("/", query).then(posts => {
                    if (this.page == 1) {
                        this.posts = this.$resource.post.models(posts.docs);
                    } else {
                        this.$resource.post.models(posts.docs).forEach(post => {
                            this.posts.push(post);
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

                let postsScroll = this.$refs.postsScroll.nativeView;

                if (postsScroll.verticalOffset > postsScroll.scrollableHeight - 250) {

                    this.loading = true;

                    this.page++;

                    this.load().then(() => {
                        this.loading = false;
                    });
                }

            }, 100)

        },

        components: {
            Post,
            Empty
        }
    }
</script>
