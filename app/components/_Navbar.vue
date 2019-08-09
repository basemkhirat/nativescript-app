<template>
    <ActionBar class="action-bar" flat="true">
        <!--
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
        -->

                <NavigationButton ios:visibility="collapsed"  @tap="onDrawerButtonTap">
                    <button class="fa" text.decode="&#xf0c9;"/>
                </NavigationButton>

        <ActionItem @tap="onDrawerButtonTap"
                    ios.position="right">
            <button class="fa" text.decode="&#xf0c9;"/>
        </ActionItem>

        <!--
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
        -->

        <ActionItem horizontalAlignment="right" v-if="hasBack" @tap="$navigateBack()"
                    ios.position="right">
            <button class="fa" text.decode="&#xf054;"/>
        </ActionItem>

        <!--        <ActionItem v-else-->
        <!--                    icon="res://navigation/menu"-->
        <!--                    @tap="onDrawerButtonTap"-->
        <!--                    ios.position="right"/>-->

        <ActionItem @tap="goProfile"
                    android.position="left"
                    android:android.position="left"
                    ios.position="left">
            <Button class="fa" text.decode="&#xf2bd;"/>
        </ActionItem>

        <slot></slot>

        <ActionItem @tap="createEvent"
                    ios.position="left">
            <Button class="fa" text.decode="&#xf271;"/>
        </ActionItem>

        <StackLayout class="action-bar-center">
            <Label v-if="title" class="action-bar-title" :text="title"/>
            <Image v-else class="action-bar-logo" src="~/assets/images/icon.png"
                   @tap="$navigateTo($routes.Home, {props: {view:'events'}, animated: false})"/>
        </StackLayout>

    </ActionBar>
</template>


<script>

    import * as utils from "~/shared/utils";
    import {TNSFancyAlert, TNSFancyAlertButton} from "nativescript-fancyalert";
    import L from 'nativescript-localize';

    export default {

        computed: {
            user() {
                return this.$store.getters.user;
            }
        },

        props: {
            title: {
                type: String,
                default: null
            },

            hasBack: {
                type: Boolean,
                default: false
            }
        },

        methods: {

            onDrawerButtonTap() {
                utils.showDrawer();
            },

            goProfile() {
                if (!this.user) {

                    TNSFancyAlert.showCustomButtons(
                        [
                            new TNSFancyAlertButton({
                                label: L("login"),
                                action: () => {
                                    this.$showModal(this.$routes.Login).then(data => {

                                        if (this.user) {

                                            setTimeout(() => {
                                                this.$navigateTo(this.$routes.Me)
                                            }, 600)

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
                    this.$navigateTo(this.$routes.Me)
                }
            },

            createEvent() {

                if (!this.user) {

                    TNSFancyAlert.showCustomButtons(
                        [
                            new TNSFancyAlertButton({
                                label: L("login"),
                                action: () => {
                                    this.$showModal(this.$routes.Login).then(data => {

                                        if (this.user) {

                                            setTimeout(() => {
                                                this.$showModal(this.$routes.CreateEvent)
                                            }, 600)

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
                    this.$showModal(this.$routes.CreateEvent)
                }

            }
        }
    };
</script>
