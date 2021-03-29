<template>
    <aside>
<!--        <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>-->
<!--        <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" header-class="header" shadow>-->
<!--            <template #default="{ hide }">-->
<!--                <div class="p-3">-->
<!--                    <h4 id="sidebar-no-header-title">Custom header sidebar</h4>-->
<!--                    <p>-->
<!--                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis-->
<!--                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.-->
<!--                    </p>-->
<!--                    <nav class="mb-3">-->
<!--                        <b-nav vertical>-->
<!--                            <b-nav-item active @click="hide">Active</b-nav-item>-->
<!--                            <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>-->
<!--                            <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>-->
<!--                        </b-nav>-->
<!--                    </nav>-->
<!--                    <b-button variant="primary" block @click="hide">Close Sidebar</b-button>-->
<!--                </div>-->
<!--            </template>-->
<!--        </b-sidebar>-->
        <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
        <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
            <div class="px-3 py-2">
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            </div>
        </b-sidebar>
    </aside>
</template>

<script>
export default {
    name: "Aside"
}
</script>

<style scoped>

</style>
