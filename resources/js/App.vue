<template>
    <div>
        <Header></Header>

        <main>
            <b-container type="light" variant="light">
                <div class="container">
                    <router-view></router-view>
                </div>
            </b-container>
        </main>
    </div>
</template>

<script>
import Header from './components/Header';

export default {
    name      : "App",
    components: {
        Header
    }
}
</script>

<style scoped>

</style>
