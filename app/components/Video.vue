<template>

    <VideoPlayer
                 :src="video.url"
                 autoplay="true" height="250"></VideoPlayer>

</template>

<script>
    export default {
        props: {
            video: Object
        },

        mounted(){
            console.log(this.video);
        }
    }
</script>
