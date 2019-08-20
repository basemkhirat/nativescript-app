<template>

    <Page class="page event-form-page" actionBarHidden="true">

        <GridLayout class="modal-page">

            <StackLayout>

                <ScrollView>

                    <GridLayout rows="70, 100, *">

                        <StackLayout row="0" class="event-form-nav">
                            <Label @tap="$modal.close" class="fa m-l-15" text.decode="&#xf00d;"/>
                        </StackLayout>

                        <StackLayout row="1" class="event-form-logo">
                            <Label class="fa" text.decode=" &#xf017;"/>
                        </StackLayout>

                        <StackLayout row="2" class="event-form-title">
                            <Label textWrap="true" :text="'create_new_event' | L"></Label>
                        </StackLayout>

                        <StackLayout row="2" class="event-form-inputs m-t-30">

                            <StackLayout class="input-field">
                                <TextField class="input input-border" :hint="'event_title' | L" v-model="event.title"/>
                            </StackLayout>

                            <FlexboxLayout class="input-field" alignItems="center" justifyContent="space-between">

                                <StackLayout>
                                    <SegmentedBar @selectedIndexChange="changeType"
                                                  backgroundColor="#5d5d8b" color="#ffffff"
                                                  selectedBackgroundColor="#2c205c">
                                        <SegmentedBarItem :title="type.title" v-for="type in types" :key="type.title"/>
                                    </SegmentedBar>
                                </StackLayout>

                                <StackLayout>
                                    <Label :text="'event_type' | L"></Label>
                                </StackLayout>

                            </FlexboxLayout>

                            <FlexboxLayout v-show="event.type == 'paid'" class="input-field" alignItems="center"
                                           justifyContent="space-between">

                                <StackLayout orientation="horizontal">
                                    <ListPicker ref="currency_picker" width="30"
                                                :items="currencies.map(currency => currency.value)"/>
                                    <TextField width="55" class="input input-border" textAlignment="center"
                                               keyboardType="number"
                                               hint="0"
                                               v-model="event.price"/>
                                </StackLayout>

                                <StackLayout>
                                    <Label :text="'event_price' | L"></Label>
                                </StackLayout>
                            </FlexboxLayout>

                            <FlexboxLayout height="100" class="input-field" alignItems="center"
                                           justifyContent="space-between">

                                <ListPicker ref="category_picker" width="100"
                                            :items="categories.map(category => category.name)"/>

                                <StackLayout>
                                    <Label :text="'event_category' | L"></Label>
                                </StackLayout>

                            </FlexboxLayout>

                            <FlexboxLayout class="input-field" alignItems="center"
                                           justifyContent="space-between">

                                <GridLayout orientation="vertical" height="30"  horizontalAlignment="center" verticalAlignment="center">
                                    <Label @tap="changeImage" v-show="!image_loading && event.media_payload == ''"
                                           class="fa"
                                           text.decode="&#xf03e;"/>
                                    <ActivityIndicator :busy="image_loading"/>
                                    <Image @tap="changeImage" v-show="!image_loading && event.media_payload != ''"
                                           :src="event.media_payload"/>

                                </GridLayout>

                                <StackLayout>
                                    <Label :text="'event_image' | L"></Label>
                                </StackLayout>

                            </FlexboxLayout>

                            <FlexboxLayout class="input-field" alignItems="center"
                                           justifyContent="space-between">

                                <StackLayout orientation="horizontal">
                                    <Label v-if="place_name" @tap="showPlacePicker" textWrap="true" :text="place_name"/>
                                    <Label v-if="!event.place" @tap="showPlacePicker" class="fa"
                                           text.decode="&#xf041;"/>

                                </StackLayout>

                                <StackLayout>
                                    <Label :text="'event_place' | L"></Label>
                                </StackLayout>

                            </FlexboxLayout>

                            <FlexboxLayout class="input-field" alignItems="center"
                                           justifyContent="space-between">

                                <StackLayout width="220" orientation="horizontal">
                                    <DateTimePickerFields
                                            ref="event_date"
                                            @dateChange="changeDate"
                                            :pickerOkText="'ok' | L"
                                            :pickerCancelText="'cancel' | L"
                                            :pickerTitleDate="'select_date' | L"
                                            :pickerTitleTime="'select_time' | L"
                                            :date="new Date()" class="date-picker"
                                            hintTime.decode="&#xf017;"></DateTimePickerFields>
                                </StackLayout>

                                <StackLayout>
                                    <Label :text="'event_time' | L"></Label>
                                </StackLayout>

                            </FlexboxLayout>


                            <StackLayout class="m-t-20 m-b-20">
                                <Button v-if="!loading" :text="'save_event' | L" @tap="save"/>
                                <ActivityIndicator v-else busy="true"/>
                            </StackLayout>

                        </StackLayout>

                    </GridLayout>
                </ScrollView>
            </StackLayout>

            <SearchPicker ref="place_picker"
                          @changed="changePlace"
                          :items="places"
                          :hint="'search_place' | L">
            </SearchPicker>
        </GridLayout>

    </Page>

</template>

<script>

    import {TNSFancyAlert} from "nativescript-fancyalert";
    import ImagePicker from '~/services/ImagePicker';
    import SearchPicker from '~/components/SearchPicker';

    export default {

        components: {
            SearchPicker
        },

        data() {
            return {
                event: {
                    title: "",
                    content: "",
                    type: "free",
                    price: 0,
                    currency: "$",
                    category: null,
                    media_payload: "",
                    scheduled_at: new Date(),
                    place: null,
                    status: 0
                },

                types: [{
                    value: "free",
                    title: this.$L("free"),
                }, {
                    value: "paid",
                    title: this.$L("paid"),
                }],

                currencies: [{
                    value: "$",
                    title: this.$L("dollar"),
                }, {
                    value: "€",
                    title: this.$L("euro"),
                }, {
                    value: "£",
                    title: this.$L("pound")
                }],

                places: [],
                categories: [],
                errors: [],
                message: false,
                loading: false,
                image_loading: false,
                place_name: ""
            }
        },

        mounted() {

            this.$resource.category.get("/").then(categories => {
                this.categories = this.$resource.category.models(categories.docs);
            });

            this.$resource.place
                .get("/search", {page: 1, limit: 1000})
                .then(data => {
                    this.places = data.docs.map(place => {
                        return {
                            id: place.id,
                            title: place.name
                        }
                    });
                });
        },

        methods: {

            save() {

                let category_index = this.$refs.category_picker.nativeView.selectedIndex;
                this.event.category = this.getCategory(category_index);

                let currency_index = this.$refs.currency_picker.nativeView.selectedIndex;
                this.event.currency = this.getCurrency(currency_index);

                let chosen_date = this.$refs.event_date.nativeView.date;
                this.event.scheduled_at = this.formatDate(chosen_date);

                this.loading = true;

                this.$resource.event.post("/", this.event)
                    .then(data => {

                        this.$modal.close("created");

                        this.$navigateTo(this.$routes.MyEvents);

                        TNSFancyAlert.showSuccess(
                            this.$L("event_created"),
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
                    })

                    .then(() => {
                        this.loading = false;
                        this.$refs.category_picker.nativeView.selectedIndex = category_index;
                        this.$refs.currency_picker.nativeView.selectedIndex = currency_index;
                        this.$refs.event_date.nativeView.date = chosen_date;
                    });

            },

            showPlacePicker() {
                this.$refs.place_picker.open();
            },

            changePlace(item) {

                this.event.place = item.id;

                setTimeout(() => {

                    let matched_place = this.places.filter(place => {
                        return place.id == item.id
                    });

                    if (matched_place.length) {
                        this.place_name = matched_place[0].title
                    }

                }, 500);

            },

            changeDate(e) {
                let date = e.value;
                this.event.date = date;
            },

            formatDate(date) {

                let d = date.getDate(),
                    m = date.getMonth() + 1,
                    y = date.getFullYear(),
                    hours = date.getHours(),
                    minutes = date.getMinutes(),
                    seconds = date.getSeconds();

                return y + "-" + (m < 10 ? '0' : '') + m + "-" + (d < 10 ? '0' : '') + d + "T"
                    + (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds + "Z";
            },

            changeImage() {

                this.image_loading = true;

                let picker = new ImagePicker();

                picker.create((error, file) => {
                    if (error) {
                        this.image_loading = false;
                    } else {
                        picker.getData(file, (error, data) => {
                            this.event.media_payload = "data:image/jpeg;base64," + data;
                            this.image_loading = false;
                        });
                    }
                });
            },

            changeType(e) {

                const nativeView = e.object.nativeView;

                if (this.types[nativeView.selectedSegmentIndex] != undefined) {
                    this.event.type = this.types[nativeView.selectedSegmentIndex].value;
                }
            },


            getCurrency(index) {

                if (this.currencies[index] != undefined) {
                    return this.currencies[index].value;
                }

                return this.event.currency;
            },

            getCategory(index) {

                if (this.categories[index] != undefined) {
                    return this.categories[index].id;
                }

                return this.event.category;
            }
        }

    };
</script>
