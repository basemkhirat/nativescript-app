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
                    <Label textWrap="true" :text="'reset_my_password' | L"></Label>
                </StackLayout>

                <StackLayout row="3" class="auth-form m-t-30">

                    <Label v-if="reset_code_sent_message" textWrap="true" class="message" :text="'reset_code_sent_message' | L"></Label>

                    <Label textWrap="true" class="message m-t-10" v-if="message"
                           :text="'password_changed_message' | L"></Label>

                    <StackLayout class="errors m-t-10">
                        <Label class="error" textWrap="true" v-for="error in errors" :key="error" :text="error"></Label>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'code' | L" v-model="code"/>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField secure="true" class="input input-border" :hint="'password' | L" v-model="password"/>
                    </StackLayout>

                    <StackLayout class="input-field m-t-10">
                        <Button v-if="!loading" :text="'send' | L" @tap="reset"/>
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
                code: "",
                password: "",
                errors: [],
                loading: false,
                reset_code_sent_message: true,
                message: false
            }
        },

        methods: {

            reset() {

                this.loading = true;

                this.$resource.auth.post("/reset", {code: this.code, password: this.password})
                    .then(data => {

                        this.errors = [];

                        this.reset_code_sent_message = false;
                        this.message = true;

                        setTimeout(() => {
                            this.$showModal(this.$routes.Login, {clearHistory: true, fullscreen: true, backstackVisible: false});
                        }, 3000);
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
