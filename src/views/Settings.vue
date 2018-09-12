<template lang="pug">
foobarz-main-content(page="settings" :title="$t(`title`)")
  h2 {{ $t(`products`) }}
  form(@submit.prevent="updateProducts(products)")
    .product(v-for="(product, index) in products" :key="product.index")
      foobarz-icon.product__icon(:name="product.icon")
      input.product__name(type="text" v-model="product.name")
      input.product__price(type="number" v-model="product.price")
    foobarz-button(type="submit") {{ $t(`update`) }}
</template>

<i18n>
{
  "en": {
    "title": "settings",
    "products": "products",
    "update": "update",
    "version": "version"
  }
}
</i18n>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: 3rem 1fr;
  grid-template-areas:
    'icon name'
    'icon price';
  grid-gap: 1rem;

  + .product {
    margin-top: 2rem;
  }

  &__icon {
    grid-area: icon;
    align-self: center;
    justify-self: center;
  }
  &__name,
  &__price {
    width: 100%;
  }
  &__name {
    grid-area: name;
  }
  &__price {
    grid-area: price;
  }
}
button {
  background: var(--c-accent);
  display: block;
  padding: 0.5rem 1rem;
  border: 0 none;
  margin-top: 1.5rem;
  width: 100%;
  text-transform: uppercase;
  color: var(--c-primary-darkest);
}
</style>


<script>
import { mapMutations } from 'vuex'

import { version } from '../../package.json'

export default {
  name: `page-settings`,
  data() {
    return {
      version,
      products: [],
    }
  },
  created() {
    this.products = this.$store.state.night.products.map(product => ({
      ...product,
    }))
  },
  methods: mapMutations({
    updateProducts: `EDIT_PRODUCT`,
  }),
}
</script>
