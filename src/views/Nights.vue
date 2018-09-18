<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)")
  ul
    li(v-for="night in nights" :key="night.id")
      p  {{ night.name }} at {{ night.barName }}
      p: small {{ night.createdAt | date }}
      p {{ night.total.all | price }} for {{ night.persons.length }} people
      router-link(:to="`/nights/${night.barId}/${night.id}`") see
      foobarz-button(@click.native="REMOVE_NIGHT({nightId: night.id})") {{$t(`remove`)}}
</template>

<i18n>
{
  "en": {
    "title": "Perdition list",
    "remove": "remove"
  }
}
</i18n>

<script>
import { mapActions } from 'vuex'

export default {
  name: `page-nights`,
  computed: {
    nights() {
      return this.$store.getters.nights()
    },
  },
  methods: {
    ...mapActions([`REMOVE_NIGHT`]),
  },
}
</script>

