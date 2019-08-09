<template>
    <Page class="page">

        <Navbar :title="page.title" hasBack="true"/>

        <StackLayout>
            <Image v-if="page && page.media" :src="page.media.thumbnails.large"></Image>
            <ScrollView v-if="page" scrollBarIndicatorVisible="false">
                <Content height="1000" :content="page.content"/>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>

    import Content from '~/components/Content';

    export default {

        data() {
            return {
                page: false,
                loading: false,
            }
        },

        created() {

            this.loading = true;

            this.$resource.page.get("/slug/help").then(page => {
                this.loading = false;
                this.page = this.$resource.page.model(page);
            });
        },

        components: {
            Content
        }
    };
</script>
