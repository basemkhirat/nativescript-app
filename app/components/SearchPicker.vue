<template>

    <Modal ref="picker">

        <GridLayout class="picker-content" rows="50, *">

            <TextField class="search-field" row="0" v-model="key" :hint="hint"></TextField>

            <StackLayout row="1" class="picker-list">
                <ListView for="item in result" rowHeight="40"  iosEstimatedRowHeight="40" @itemTap="select">
                    <v-template>
                        <Label :text="item.title"/>
                    </v-template>
                </ListView>
            </StackLayout>

        </GridLayout>

    </Modal>

</template>

<script>
    import Modal from '~/components/modal';

    export default {

        props: {
            hint: {
                type: String,
                default : "search"
            },
            items: {
                type: Array
            }
        },

        watch: {
            key: function (key) {
                this.search(key);
            },
            items: function (items) {
                this.result = items;
            }
        },

        data() {
            return {
                picker: null,
                key: "",
                result: this.items
            }
        },

        components: {
            Modal
        },

        methods: {

            open() {
                this.picker = this.$refs.picker;
                this.picker.open();
            },

            search(key){
                this.result = this.items.filter(item => {
                    return item.title.match(key);
                })
            },

            select(event) {
                this.$emit("changed", event.item);
                this.picker.close();
            }
        }

    }

</script>

<style lang="scss" scoped>

    .picker-content {

        height: 350;
        width: 300;
        border-radius: 10;

        .search-field{
            text-align: center;
            padding: 5 10;
            background-color: #d0ccce;
            height: 50
        }
    }

    .picker-list {

        background-color: #ffffff;

        Label {
            padding: 5 10;
            height: 40;
        }
    }

</style>
