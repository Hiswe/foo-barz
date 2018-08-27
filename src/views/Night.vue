<template lang="pug">
foobars-main-content(page="night" title="Night")
  dl
    dt total
    dd {{totals.all}}
    dd(v-if="totals.perPerson") per person {{totals.perPerson}}
  menu
    button(
      v-for="product in products"
      :key="product.id"
      @click="addItem(product)"
    )
      foobars-icon(:name="product.icon")
      div {{product.price}} {{product.currency}}
    button(
      @click="addPerson"
    )
      foobars-icon(name="person-add" :scale="2.5")
  h2 selection
  div
    button(
      v-for="(item, index) in items"
      :key="item.id"
      @click="removeItem(item.id)"
    )
      foobars-icon(
        :name="item.icon"
      )
  h2 people
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
    removeItem: `REMOVE_ITEM`,
    addPerson: `ADD_PERSON`,
    removePerson: `REMOVE_PERSON`,
  }),
}
</script>
