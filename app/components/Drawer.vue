<template lang="html">
    <RadSideDrawer shadowColor="#ffffff" ref="drawer" drawerLocation="Right"
                   gesturesEnabled="true" :drawerTransition="transition">

        <GridLayout ~drawerContent rows="auto, *" class="sidedrawer">

            <FlexboxLayout v-if="user" row="0" class="sidedrawer-header">
                <Label class="sidedrawer-header-image fa" text.decode="&#xf2bd;"></Label>
                <Label class="sidedrawer-header-name" :text="user.name"></Label>
                <Label class="sidedrawer-header-email" :text="user.email"></Label>
            </FlexboxLayout>

            <FlexboxLayout v-if="!user" row="0" class="sidedrawer-header">
                <Label class="sidedrawer-header-image fa" text.decode="&#xf2bd;"></Label>
                <Label class="sidedrawer-header-name" :text="'login' | L" @tap="login"></Label>
            </FlexboxLayout>

            <ScrollView row="1" class="sidedrawer-content">

                <StackLayout>

                    <GridLayout columns="*, 50" rows="50" class="sidedrawer-item"
                                :class="{selected: selectedPage === 'Home'}"
                                @tap="onNavigationItemTap($routes.Home, {animated: false, props: {view: 'events'}})">
                        <Label col="0" class="sidedrawer-item-title" :text="'events' | L"></Label>
                        <Label col="1" class="fa sidedrawer-item-icon" text.decode="&#xf133;"></Label>
                    </GridLayout>

                    <GridLayout columns="*, 50" rows="50" class="sidedrawer-item"
                                :class="{selected: selectedPage === 'Home'}"
                                @tap="onNavigationItemTap($routes.Home, {animated: false, props: {view: 'posts'}})">
                        <Label col="0" class="sidedrawer-item-title" :text="'posts' | L"></Label>
                        <Label col="1" class="fa sidedrawer-item-icon" text.decode="&#xf1ea;"></Label>
                    </GridLayout>

                    <GridLayout columns="*, 50" rows="50" class="sidedrawer-item"
                                :class="{selected: selectedPage === 'Help'}"
                                @tap="onNavigationItemTap($routes.Help)">
                        <Label col="0" class="sidedrawer-item-title" :text="'help' | L"></Label>
                        <Label col="1" class="fa sidedrawer-item-icon" text.decode="&#xf059;"></Label>
                    </GridLayout>

                    <GridLayout v-if="user" columns="*, 50" rows="50" class="sidedrawer-item" @tap="logout">
                        <Label col="0" class="sidedrawer-item-title" :text="'logout' | L"></Label>
                        <Label col="1" class="fa sidedrawer-item-icon" text.decode="&#xf08b;"></Label>
                    </GridLayout>

                </StackLayout>
            </ScrollView>
        </GridLayout>

        <Frame ~mainContent ref="drawerMainContent">
            <slot name="mainContent"></slot>
        </Frame>

    </RadSideDrawer>
</template>

<script>

    import * as utils from "~/shared/utils";
    import {SlideInOnTopTransition} from "nativescript-ui-sidedrawer";
    import {TNSFancyAlert, TNSFancyAlertButton} from "nativescript-fancyalert";
    import L from 'nativescript-localize';

    export default {

        computed: {
            user() {
                return this.$store.getters.user
            }
        },

        data() {
            return {
                selectedPage: "home",
                transition: new SlideInOnTopTransition()
            };
        },

        methods: {

            onNavigationItemTap(component, options) {
                this.$navigateTo(component, {
                    ...options
                });
                utils.closeDrawer();
            },

            logout() {

                if (this.$platform == "android") {

                    this.$store.dispatch("logout");

                    utils.closeDrawer();

                    this.$navigateTo(this.$routes.Home, {
                        props: {view: "events"},
                        animated: false,
                        clearHistory: true,
                        backstackVisible: false
                    });

                } else {

                    TNSFancyAlert.showCustomButtons(
                        [
                            new TNSFancyAlertButton({
                                label: L("logout"),
                                action: () => {

                                    this.$store.dispatch("logout");

                                    utils.closeDrawer();

                                    this.$navigateTo(this.$routes.Home, {
                                        props: {view: "events"},
                                        animated: false,
                                        clearHistory: true,
                                        backstackVisible: false
                                    });

                                    TNSFancyAlert.showSuccess(
                                        L("logout_done"),
                                        undefined,
                                        L("close")
                                    );
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
                        undefined,
                        L("really_logout")
                    );
                }
            },

            login() {
                this.$showModal(this.$routes.Login, {fullscreen: true});
                utils.closeDrawer();
            }
        }
    };

</script>

<style scoped lang="scss">

    @import "../assets/variables";

    .sidedrawer {

        background: #ffffff;

        .sidedrawer-header {

            background-color: #ffffff;
            flex-direction: column;
            justify-content: center;

            Label {
                margin: 2 0;
            }

            .sidedrawer-header-image {
                color: $primary-color;
                height: 60;
                width: 80;
                font-size: 60;
                text-align: center;
                background-color: #ffffff;
            }

            .sidedrawer-header-name {
                color: $primary-color;
                text-align: center;
            }

            .sidedrawer-header-email {
                color: $primary-color;
                text-align: center;
            }

        }

        .sidedrawer-content {

            background: $primary-color;

            .sidedrawer-item {

                padding-left: 15;
                border-bottom-color: #2e2279;
                border-bottom-width: 1;

                label {
                    vertical-align: center;
                    color: #ffffff;
                }

                .sidedrawer-item-icon {
                    font-size: 25;
                    color: #ffffff;
                    text-align: center;
                }

                .sidedrawer-item-title {
                    font-family: $primary-font;
                }

                &.selected {
                    background-color: #cc2f1e;

                    label {
                        color: $primary-color;
                    }
                }
            }
        }

    }

</style>

