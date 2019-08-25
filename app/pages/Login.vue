<template>

    <Page class="page auth-page" actionBarHidden="true">

        <ScrollView>

            <GridLayout rows="70, 100, *" class="modal-page">

                <StackLayout row="0" class="auth-nav">
                    <Label @tap="$modal.close" class="fa m-l-15" text.decode="&#xf00d;"/>
                </StackLayout>

                <StackLayout row="1" class="auth-logo">
                    <Image src="~/assets/images/logo.png"/>
                </StackLayout>

                <StackLayout row="2" class="auth-title">
                    <Label textWrap="true" :text="'login' | L"></Label>
                </StackLayout>

                <StackLayout row="3" class="auth-form">

                    <FlexboxLayout orientation="vertical" justifyContent="space-between">
                        <Button class="fa facebook-share-btn" @tap="facebook" text.decode="&#xf230;"></Button>
                        <Button class="fa google-share-btn" @tap="google" text.decode="&#xf0d4;"></Button>
                    </FlexboxLayout>

                    <Label class="login-separator" :text="'or_login_with_your_email' | L">OR</Label>

                    <StackLayout class="errors">
                        <Label textWrap="true" class="error" v-for="error in errors" :key="error" :text="error"></Label>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'email' | L" v-model="user.email"/>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'password' | L" v-model="user.password"
                                   secure="true"/>
                    </StackLayout>

                    <StackLayout class="input-field m-t-10">
                        <Button v-if="!loading" :text="'login' | L" @tap="login"/>
                        <ActivityIndicator v-else :busy="true"/>
                    </StackLayout>

                    <FlexboxLayout class="form-links m-t-10">
                        <Label :text="'forget_password' | L"
                               @tap="$showModal($routes.Forget, {clearHistory: true, fullscreen: true, backstackVisible: false})"/>
                        <Label :text="'new_user' | L" @tap="$showModal($routes.Register, {fullscreen: true})"/>
                    </FlexboxLayout>

                </StackLayout>

            </GridLayout>

        </ScrollView>
    </Page>

</template>

<script>

    import Auth from "~/plugins/Auth";
    import {TNSFancyAlert} from "nativescript-fancyalert";


    export default {

        data() {
            return {
                user: {
                    email: "root@dotdev.ae",
                    password: "qwertyui"
                },
                errors: [],
                loading: false
            }
        },

        methods: {

            login() {

                this.loading = true;

                this.$resource.auth.post("/token", this.user)
                    .then(data => {

                        this.errors = [];

                        this.$store.dispatch("login", data.token).then(data => {
                            this.$modal.close("logged");
                        });
                    })
                    .catch(errors => {
                        this.errors = [errors[0]];
                    })
                    .then(() => {
                        this.loading = false;
                    });

            },

            facebook() {

                this.$modal.close();

                Auth.login("facebook", (error, tokens) => {

                    if (error) return false;

                    this.$resource.auth.post("/facebook", {access_token: tokens.accessToken})
                        .then(data => {

                            this.$store.dispatch("login", data.token);

                            TNSFancyAlert.showSuccess(
                                this.$L("welcome"),
                                undefined,
                                this.$L("close")
                            );
                        })
                        .catch(errors => {
                            TNSFancyAlert.showError(
                                errors[0],
                                undefined,
                                this.$L("close")
                            );
                        });
                });
            },

            google() {

                this.$modal.close();

                Auth.login("google", (error, tokens) => {

                    if (error) return false;

                    this.$resource.auth.post("/google", {access_token: tokens.accessToken})
                        .then(data => {

                            this.$store.dispatch("login", data.token);

                            TNSFancyAlert.showSuccess(
                                this.$L("welcome"),
                                undefined,
                                this.$L("close")
                            );
                        })
                        .catch(errors => {
                            TNSFancyAlert.showError(
                                errors[0],
                                undefined,
                                this.$L("close")
                            );
                        });
                });
            }
        }

    };
</script>
