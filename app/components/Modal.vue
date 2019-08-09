<template>

    <GridLayout rows="*" columns="*" class="modal-wrapper" :class="{ opened: opened }">

        <StackLayout class="modal-overlay" @tap="close"></StackLayout>

        <AbsoluteLayout class="modal-content">
            <slot></slot>
        </AbsoluteLayout>

    </GridLayout>

</template>

<script>

    export default {

        data() {
            return {
                opened: false,
            }
        },

        methods: {

            open() {
                this.opened = true;
                this.$emit("opened");
            },

            close() {
                this.opened = false;
                this.$emit("closed");
            }

        }
    }

</script>


<style lang="scss" scoped>

    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal-wrapper {

        width: 100%;
        height: 100%;
        vertical-alignment:center;
        visibility: collapse;

        .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
        }

        .modal-content {
            vertical-align: center;
            horizontal-align: center;
            opacity: 0;
            width: auto;
            height: auto;
        }

        &.opened {

            visibility: visible;

            .modal-content {
                animation-name: show;
                animation-duration: 0.5s;
                animation-fill-mode: forwards;
            }
        }
    }

</style>
