<template>
    <Label class="fa like" :class="{active: is_liked}" @tap="like" text.decode="&#xf004;"/>
</template>

<script>

    import {TNSFancyAlert, TNSFancyAlertButton} from "nativescript-fancyalert";
    import L from 'nativescript-localize';

    export default {

        props: {
            event: {
                type: Object
            }
        },

        computed: {
            user() {
                return this.$store.getters.user;
            }
        },

        data() {
            return {
                is_liked: this.event.is_liked
            }
        },

        watch: {
            event: {
                handler() {
                    this.is_liked = this.event.is_liked;
                },
                deep: true
            }
        },

        methods: {

            like() {

                if (!this.user) {

                    if (this.$platform == "ios") {

                        TNSFancyAlert.showCustomButtons(
                            [
                                new TNSFancyAlertButton({
                                    label: L("login"),
                                    action: () => {
                                        this.$showModal(this.$routes.Login, {fullscreen: true}).then(data => {
                                            if (this.user) {
                                                this.doLike();
                                            }
                                        });
                                    }
                                }),
                                new TNSFancyAlertButton({
                                    label: L("close"),
                                    action: () => {
                                        // close
                                    }
                                })
                            ],
                            "icon",
                            "#2c205c",
                            L("not_registered"),
                            L("need_login_to_continue")
                        );

                    } else {
                        this.$showModal(this.$routes.Login, {fullscreen: true});
                    }

                } else {
                    this.doLike();
                }
            },

            doLike() {
                this.is_liked = !this.is_liked;
                this.$resource.event.put("/like/" + this.event.id);
                this.$store.commit("event_should_change", {
                    id: this.event.id,
                    data: {
                        is_liked: this.is_liked
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>

    @import "../assets/variables";

    .like {
        color: #393939;
        font-size: 20;
    }

    .like.active {
        color: $secondary-color;
    }

</style>
