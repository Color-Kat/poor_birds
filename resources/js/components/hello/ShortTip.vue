<template>
    <div
        class="col-lg-4 col-md-6 p-2 "
    >
        <div
            class="shadow-lg col-12 bg-white justify-content-center d-flex flex-wrap"
            style="border-radius: 24px; padding: 8px; transition: all .1s ease-in"
            onmouseover="this.style.transform = 'translateY(-10%) scale(1.02)';"
            onmouseout="this.style.transform = '' "

            @click="go"
            :style="{cursor: link ? 'pointer' : ''}"
        >
            <div
                class="d-flex justify-content-center align-items-center rounded-circle my-3"
                style="width: 140px; height:140px; background: #EFF6FF;"
            >
                <img
                    class="h-75 w-auto"
                    :src="image"
                >
            </div>

            <div class="px-4 text-sm-left text-center">
                <h2 style="font-family: Montserrat;"><storng>{{ title }}</storng></h2>
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name   : "ShortTip",
    props  : ['title', 'text', 'image', 'link'],
    methods: {
        go() {
            if (this.link) this.$router.push({name: this.link});
        }
    }
}
</script>

<style scoped>

</style>
