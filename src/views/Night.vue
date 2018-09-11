<template lang="pug">
foobarz-main-content(page="night" :title="$t(`title`)")
  dl.totals
    dt.totals__label {{ $t( 'total') }}
    dd.totals__value {{totals.all}}฿
    template(v-if="totals.perPerson")
      dt.totals__label {{ $t( 'total-person') }} ({{persons.length}})
      dd.totals__value {{totals.perPerson}}฿

  button.night__action.night__action--clear(@click="clearNight")
    foobarz-icon(
      name="remove-shopping-cart"
      :scale="2.5"
    )
  menu.night__items
    button.night__action(
      v-for="product in products"
      :key="product.id"
      @click="addItem(product)"
    )
      foobarz-icon(:name="product.icon")
      div {{product.price}}฿
    button.night__action.night__action--add-person(
      @click="addPerson"
    )
      foobarz-icon(name="person-add" :scale="2.5")
  template(v-if="items.length")
    h2.night__title {{ $t('selection') }}
    div
      button.night__action(
        v-for="(item, index) in items"
        :key="item.id"
        @click="removeItem(item.id)"
      )
        foobarz-icon(
          :name="item.icon"
        )
  template(v-if="persons.length")
    h2.night__title {{ $t('people') }}
    div
      button.night__action(
        v-for="person in persons"
          :key="person.id"
        @click="removePerson(person.id)"
      )
        foobarz-icon(
          name="person"
          :scale="2.5"
        )
</template>

<style lang="scss" scoped>
.night {
  &__title {
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
  &__items {
    margin: 0;
    padding: 1rem 0;
    text-align: center;
  }
  &__action {
    border: 0;
    background: none;

    &--clear,
    &--add-person {
      position: absolute;
      top: 0.5rem;
    }
    &--clear {
      left: 1rem;
    }
    &--add-person {
      right: 1rem;
    }
  }
}
.totals {
  background: var(--c-primary-darker);
  padding: 1rem;
  margin: 0;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.5rem;
  border-radius: 0.5rem;

  &__label,
  &__value {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  &__label {
    text-transform: uppercase;
    font-size: 0.9rem;
    grid-row: 1;
  }
  &__value {
    grid-row: 2;
    color: var(--c-accent);
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
