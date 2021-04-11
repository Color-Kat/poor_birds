<template>
    <div class="grid-view">
        <!--            v-for="item of getSellers"-->
        <slot

            class="mb-2 card-item"
        />
    </div>
<!--    <b-card-->
<!--        v-for="seller of getSellers"-->
<!--        class="mb-2 card-item"-->
<!--        :title="seller.name"-->
<!--        :img-src="`/storage/${seller.image}`"-->
<!--        :img-alt="seller.name"-->
<!--        img-top-->
<!--        tag="article"-->

<!--        @click="()=>redirect(seller.id)"-->
<!--        :key="seller.id"-->
<!--    >-->
<!--        <b-card-text>-->
<!--            {{ seller.description }}-->
<!--        </b-card-text>-->

<!--        &lt;!&ndash;                    <b-button class="card-btn" href="#" variant="primary">Посмотреть предложения</b-button>&ndash;&gt;-->
<!--    </b-card>-->
</template>

<script>
export default {
    name: "GridView",
    props: ['items']
}
</script>

<style scoped lang="scss">
.grid-cards {
    column-count: 2;
.card-item {
    display: inline-block;
    height: max-content;
    margin: 25px 0;
    width: 100%;
    cursor: pointer;

    transition: all .1s ease-in-out;

&:hover{
     transform: scale(1.01);
 }

.card-body{
    border: 2px solid #e5e5e5;
    border-top: 0;
    border-radius: 4px;
    padding: 7px !important;
}
}

@media screen and (min-width: 2000px) {
& {
    grid-template-columns: 1fr 1fr 1fr 1fr !important;
    column-count: 4 !important;
}
}
@media screen and (min-width: 1300px) {
& {
    grid-template-columns: 1fr 1fr 1fr;
    column-count: 3;
}
}
@media screen and (max-width: 950px) {
& {
    grid-template-columns: 1fr !important;
    column-count: 1 !important;
}
}

//.card-item {
  //    position: relative;
  //    padding-bottom: 40px;
//
//    .card-btn {
      //        position: absolute;
      //        bottom: 0;
      //        margin-bottom: 8px;
      //        left: 50%;
      //        transform: translateX(-50%);
      //        width: 90%;
      //    }
//}
}
</style>
