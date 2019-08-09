<template>

    <GridLayout rows="150,150" class="post-card">

        <StackLayout row="0" backgroundColor="#000" @tap="openDetails">
            <Image v-if="post.media" :src="post.media.thumbnails.medium"/>
            <Image v-if="!post.media" src="~/assets/default/post.png"/>
        </StackLayout>

        <StackLayout row="1" class="p-10">

            <StackLayout horizontalAlignment="right" orientation="horizontal">
                <Label class="post-time" :text="post.created" />
                <Label class="fa" text.decode=" &#xf017;" />
            </StackLayout>

            <Label class="post-title" textWrap="true" :text="post.title" @tap="openDetails" />
            <Label class="post-excerpt" textWrap="true" :text="post.excerpt" />

        </StackLayout>

    </GridLayout>

</template>

<script>

    export default {

        props: ["post"],

        methods: {
            openDetails() {
                this.$navigateTo(this.$routes.Post, {
                    props: {
                        post: this.post
                    }
                });
            }
        }
    }

</script>
