<template>
    <div
        class="d-flex flex-row flex-wrap"
        :class="reverse ? 'flex-md-row-reverse' : ''"
        style="border-radius: 24px; padding: 8px;"
    >
        <!--    content    -->
        <div class="col-md-7">
            <h2 style="font-family: Montserrat">{{ title }}</h2>
            <p class="lead">
                {{ text }}
            </p>
        </div>
        <!--    content    -->

        <!--    image    -->
        <div
            class="col-md-5 d-flex justify-content-center align-items-center"
            :class="!reverse ? 'justify-content-md-end' : 'justify-content-md-start'"
        >
            <img
                class="img-fluid"
                :src="image"
                style="max-height: 210px; "
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "Tip",
    props: ['title', 'text', 'image', 'reverse']
}
</script>

<style scoped>

</style>
