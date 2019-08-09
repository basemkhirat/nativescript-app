<template>

    <Page class="page book-page" actionBarHidden="true">

        <ScrollView>

            <GridLayout rows="70, 100, *" class="modal-page">

                <StackLayout row="0" class="book-nav">
                    <Label @tap="$modal.close" class="fa m-l-15" text.decode="&#xf00d;"/>
                </StackLayout>

                <StackLayout row="1" class="book-heading">
                    <Label textWrap="true" class="heading-title" :text="'book_event' | L"></Label>
                    <Label textWrap="true" class="heading-event m-t-20" :text="event.title"></Label>
                </StackLayout>

                <AbsoluteLayout row="2" v-if="event.media" backgroundSize="cover" :backgroundImage="event.media.thumbnails.default" opacity="0.04" />

                <StackLayout row="2" class="book-form">

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

                    <StackLayout class="input-field m-t-10">
                        <Button v-if="!loading" :text="'book_now' | L" @tap="book"/>
                        <ActivityIndicator v-else busy="true"/>
                    </StackLayout>

                </StackLayout>

            </GridLayout>



        </ScrollView>

    </Page>

</template>

<script>

    import {TNSFancyAlert} from "nativescript-fancyalert";
    import L from 'nativescript-localize';

    export default {

        props: {
            event: Object
        },

        computed: {
            user() {

                let logged = this.$store.getters.user;

                return logged ? logged : {
                    first_name: "",
                    last_name: "",
                    email: ""
                }
            }
        },

        data() {
            return {
                errors: [],
                message: false,
                loading: false
            }
        },

        methods: {

            book() {

                this.loading = true;

                this.$resource.event.put("/register/" + this.event.id, this.user)

                    .then(data => {

                        this.$modal.close();

                        TNSFancyAlert.showSuccess(
                            L("booked_done"),
                            undefined,
                            L("close")
                        );
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
