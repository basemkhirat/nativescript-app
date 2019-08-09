<template>
    <StackLayout class="categories-bar">

        <ScrollView ref="categoriesScroll" orientation="horizontal" scrollBarIndicatorVisible="false">

            <StackLayout class="categories-wrapper" orientation="horizontal">

                <Label :class="{active: active == category.id}" class="category-tab" @tap="activateCategory(category)"
                       v-for="category in categories"
                       :key="category.id" :text="category.name"></Label>

                <Label v-show="categories.length" :class="{active: active == false}" class="home-tab fa" @tap="activateCategory(false)"
                       text.decode="&#xf015;"></Label>
            </StackLayout>
        </ScrollView>

    </StackLayout>

</template>

<script>

    export default {

        data() {
            return {
                categories: [],
                active: false
            }
        },

        mounted() {
            this.$resource.category.get("/").then(categories => {

                this.categories = this.$resource.category.models(categories.docs);

                setTimeout(() => {
                    let scrollView = this.$refs.categoriesScroll.nativeView;
                    scrollView.scrollToHorizontalOffset(scrollView.scrollableWidth, true)
                },300);
            });
        },

        methods: {
            activateCategory(category) {
                this.active = category ? category.id : false;
                this.$emit("changed", category);
            }
        }

    }

</script>
