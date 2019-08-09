<template>


    <StackLayout>
        <StackLayout v-for="row in c" :key="row.content" class="content" orientation="vertical">

                <HtmlView fontFamily="SST Arabic" padding="30" height="100%" width="100%" v-if="row.type == 'paragraph'"
                          isUserInteractionEnabled="true" :html="renderHtml(row.content)"/>

<!--                <Video width="100%" :video="row.video" v-if="row.type == 'video'"></Video>-->

        </StackLayout>
    </StackLayout>

</template>

<script>

    import Video from '~/components/Video';

    export default {

        props: {
            content: Array | String
        },

        data() {
            return {
                c: Array.isArray(this.content) ? this.content : [{type: "paragraph", content: this.content}]
            }
        },

        methods: {
            renderHtml(content) {
                if (this.$platform == "ios") {
                    return "<style> * { font-family: 'SST Arabic', 'Verdana' } a { font-family: Arial } </style><div style='text-align: right; font-weight: 400; color: #393939; direction: rtl; font-size: 14px'>" + content + "</div>";
                } else {
                    return "<div style='text-align: right; font-weight: 400; color: #393939; direction: rtl; font-size: 14px'>" + content + "</div>";
                }

            }
        },

        components: {
            Video
        }
    }

</script>

<style scoped>

    .content {
        margin-top: 15;
        margin-bottom: 15;
    }

</style>
