<template lang="pug">
foobars-main-content(page="night" :title="$t(`title`)")
  dl.totals
    dt.totals__label {{ $t( 'total') }}
    dd.totals__value {{totals.all}}฿
    template(v-if="totals.perPerson")
      dt.totals__label {{ $t( 'total-person') }}
      dd.totals__value {{totals.perPerson}}฿

  button.night__action(@click="clearNight")
    foobars-icon(
      name="remove-shopping-cart"
      :scale="2.5"
    )
  menu
    button.night__action(
      v-for="product in products"
      :key="product.id"
      @click="addItem(product)"
    )
      foobars-icon(:name="product.icon")
      div {{product.price}}฿
    button.night__action(
      @click="addPerson"
    )
      foobars-icon(name="person-add" :scale="2.5")
  h2 {{ $t('selection') }}
  div
    button.night__action(
      v-for="(item, index) in items"
      :key="item.id"
      @click="removeItem(item.id)"
    )
      foobars-icon(
        :name="item.icon"
      )
  h2 {{ $t('people') }}
  div
    button.night__action(
      v-for="person in persons"
        :key="person.id"
      @click="removePerson(person.id)"
    )
      foobars-icon(
        name="person"
        :scale="2.5"
      )
</template>

<style lang="scss" scoped>
.night {
  &__action {
    border: 0;
    background: none;
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Night",
    "total": "total",
    "total-person": "per person",
    "selection": "selection",
    "people": "people"
  }
}
</i18n>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: `page-night`,
  computed: {
    ...mapState({
      products: state => state.night.products,
      items: state => state.night.items,
      persons: state => state.night.persons,
    }),
    ...mapGetters([`totals`]),
  },
  methods: mapMutations({
    addItem: `ADD_ITEM`,
    clearNight: `CLEAR_NIGHT`,
    removeItem: `REMOVE_ITEM`,
    addPerson: `ADD_PERSON`,
    removePerson: `REMOVE_PERSON`,
  }),
}
</script>
