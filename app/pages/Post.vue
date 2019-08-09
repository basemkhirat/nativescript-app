<template>
    <Page class="page post-page">

        <Navbar :hasBack="true"/>

        <ScrollView iosOverflowSafeArea="false">

            <StackLayout>

                <StackLayout backgroundColor="#000" height="250">
                    <Image height="100%" v-if="p.media" :src="p.media.thumbnails.large"/>
                    <Image v-if="!p.media" src="~/assets/default/post.png"/>
                </StackLayout>

                <StackLayout class="post-main">

                    <StackLayout horizontalAlignment="right" orientation="horizontal">
                        <Label class="post-time" :text="p.created"/>
                        <Label class="fa" text.decode=" &#xf017;"/>
                    </StackLayout>

                    <Label class="post-title" :text="p.title"/>

                    <Content :content="p.content"></Content>
                </StackLayout>
            </StackLayout>
        </ScrollView>

    </Page>
</template>

<script>

    import Content from '~/components/Content';
    import Share from '~/components/Share';

    export default {

        props: {
            post: {
                type: Object
            }
        },

        data() {
            return {
                p: this.post,
                loading: false
            }
        },

        watch: {
            post() {
                this.p = this.post;
            }
        },

        created() {
            this.load();
        },

        methods: {
            load() {
                return this.$resource.post.get("/" + this.p.id).then(post => {
                    this.e = this.$resource.post.model(post);
                });
            }
        },
        components: {
            Content,
            Share
        }
    };
</script>
