<template lang="pug">
foobarz-main-content(page="edit-article" :title="$t(`title`)")
  form(@submit.prevent="updateProducts()")
    //- .product(v-for="(product, index) in products" :key="product.index")
    //-   foobarz-icon.product__icon(:name="product.icon")
    //-   input.product__name(type="text" v-model="product.name")
    //-   input.product__price(type="number" v-model="product.price")
    //- foobarz-button(type="submit") {{ $t(`update`) }}
</template>

<i18n>
{
  "en": {
    "title": "edit article"
  }
}
</i18n>

<script>
export default {
  name: `page-edit-article`,
  methods: {
    updateProducts() {},
  },
  created() {
    // this.products = this.$store.state.products.list.map(product => ({
    //   ...product,
    // }))
  },
}
</script>

