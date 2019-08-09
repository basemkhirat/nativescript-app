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
                    <Label textWrap="true" :text="'create_new_account' | L"></Label>
                </StackLayout>

                <StackLayout row="2" class="auth-form m-t-30">

                    <StackLayout class="errors">
                        <Label textWrap="true" class="error" v-for="error in errors" :key="error" :text="error"></Label>
                    </StackLayout>

                    <FlexboxLayout class="input-field" justifyContent="space-between">

                        <StackLayout class="input-field" width="46%">
                            <TextField class="input input-border" :hint="'last_name' | L" v-model="user.last_name"/>
                        </StackLayout>

                        <StackLayout class="input-field" width="46%">
                            <TextField class="input input-border" :hint="'first_name' | L" v-model="user.first_name"/>
                        </StackLayout>
                    </FlexboxLayout>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'email' | L" v-model="user.email"/>
                    </StackLayout>

                    <StackLayout class="input-field">
                        <TextField class="input input-border" :hint="'password' | L" v-model="user.password"
                                   secure="true"/>
                    </StackLayout>

                    <StackLayout class="input-field m-t-10">
                        <Button v-if="!loading" :text="'register' | L" @tap="register"/>
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
                user: {
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: ""
                },
                errors: [],
                message: false,
                loading: false
            }
        },

        methods: {

            register() {

                this.loading = true;

                this.$resource.user.post("/", this.user)
                    .then(data => {
                        this.$showModal(this.$routes.Verify, {fullscreen: true});
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
