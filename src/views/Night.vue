<template lang="pug">
foobars-main-content(page="night" :title="$t(`title`)")
  dl
    dt {{ $t( 'total') }}
    dd {{totals.all}}฿
    dd(v-if="totals.perPerson") {{ $t( 'total-person') }} {{totals.perPerson}}฿

  button(@click="clearNight")
    foobars-icon(
      name="remove-shopping-cart"
      :scale="2.5"
    )
  menu
    button(
      v-for="product in products"
      :key="product.id"
      @click="addItem(product)"
    )
      foobars-icon(:name="product.icon")
      div {{product.price}}฿
    button(
      @click="addPerson"
    )
      foobars-icon(name="person-add" :scale="2.5")
  h2 {{ $t('selection') }}
  div
    button(
      v-for="(item, index) in items"
      :key="item.id"
      @click="removeItem(item.id)"
    )
      foobars-icon(
        :name="item.icon"
      )
  h2 {{ $t('people') }}
  div
    button(
      v-for="person in persons"
        :key="person.id"
      @click="removePerson(person.id)"
    )
      foobars-icon(
        name="person"
        :scale="2.5"
      )
</template>

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
