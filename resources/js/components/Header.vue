<template>
    <header>
        <b-navbar fixed="top" toggleable="lg" type="light" variant="light">
            <b-navbar-brand to="/">
                <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
                Бедные птицы
             </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/account/birds">Мои птицы</b-nav-item>
                    <b-nav-item to="/account/bazaar">Базар</b-nav-item>
                    <b-nav-item to="/store">Магазин</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown >
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Имя</em>
                        </template>
                        <b-dropdown-item to="#">Профиль</b-dropdown-item>
                        <b-dropdown-item to="#">Войти</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Найти</b-button>
                    </b-nav-form>


                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>

export default {
    name: "header-component",
    data: function () {
        return {

        }
    }
}
</script>

<style scoped>

</style>
