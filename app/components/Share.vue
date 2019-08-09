<template>
    <Label class="fa share" @tap="share" text.decode="&#xf1e0;"/>
</template>

<style lang="scss" scoped>

    .share {
        color: #393939;
        font-size: 20;
    }

</style>

<script>

    var SocialShare = require("nativescript-social-share");

    export default {

        props: {
            event: {
                type: Object
            }
        },

        methods: {
            share() {
                SocialShare.shareUrl(encodeURI(this.event.url), this.event.title, this.event.excerpt);
            }
        }

    }

</script>
