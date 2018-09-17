<template lang="pug">
foobarz-main-content(page="nights" :title="$t(`title`)")
  ul
    li(v-for="night in nights" :key="night.id")
      p  {{ night.name }} at {{ night.barName }}
      p: small {{ night.createdAt | date }}
      p {{ night.total.all | price }} for {{ night.persons.length }} people
      router-link(:to="`/nights/${night.barId}/${night.id}`") see
</template>

<i18n>
{
  "en": {
    "title": "Perdition list"
  }
}
</i18n>

<script>
import { mapState } from 'vuex'

export default {
  name: `page-nights`,
  computed: mapState({
    nights: state => state.nights.list,
  }),
}
</script>

