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
                    <Label textWrap="true" :text="'forget_password' | L"></Label>
                </StackLayout>

                <StackLayout row="3" class="auth-form m-t-30">

                    <StackLayout class="errors m-t-10">
                        <Label class="error" textWrap="true" v-for="error in errors" :key="error" :text="error"></Label>
                    </StackLayout>

                    <Label textWrap="true" class="message m-t-10" v-if="message" :text="message"></Label>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'email' | L" v-model="email"/>
                    </StackLayout>

                    <StackLayout class="input-field m-t-10">
                        <Button v-if="!loading" :text="'send' | L" @tap="forget"/>
                        <ActivityIndicator v-else busy="true"/>
                    </StackLayout>

                    <StackLayout class="form-links m-t-10">
                        <Label :text="'have_account' | L" @tap="$showModal($routes.Login, {fullscreen: true})"/>
                    </StackLayout>

                </StackLayout>

            </GridLayout>

        </ScrollView>
    </Page>

</template>

<script>

    export default {

        data() {
            return {
                email: "",
                errors: [],
                loading: false,
                message: null
            }
        },

        methods: {

            forget() {

                this.loading = true;

                this.$resource.auth.post("/forget", {email: this.email})
                    .then(data => {
                        this.errors = [];
                        this.$showModal(this.$routes.Reset, {clearHistory: true, fullscreen: true, backstackVisible: false});
                    })
                    .catch(errors => {
                        this.errors = [errors[0]];
                    })
                    .then(() => {
                        this.loading = false;
                    });
            }

        }

    };
</script>
