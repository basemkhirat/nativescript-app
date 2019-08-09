<template>
    <FlexboxLayout class="empty-box">
        <Label class="fa" text.decode="&#xf1f8;"/>
        <Label class="empty-box-title" :text="title" v-if="title"/>
    </FlexboxLayout>
</template>

<script>

    import L from 'nativescript-localize';

    export default {

        props: {
            title: {
                type: String,
                default: L("empty_content")
            }
        },

    }

</script>

<style lang="scss" scoped>

    @import "../assets/variables";

    .empty-box {

        flex-direction: column;
        justify-content: center;
        background-color: #efefef;
        height: 200;
        border-width: 1;
        border-color: #cccccc;
        border-radius: 5;

        Label{
            text-align: center;
        }

        .fa {
            font-size: 25;
        }

        .empty-box-title {
            font-family: $primary-font;
        }

    }

</style>
