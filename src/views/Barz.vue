<template lang="pug">
foobarz-main-content(page="home" title="Barz")
  p {{$t('description')}}
  ul.barz
    li.barz__item(v-for="bar in barz")
      p.barz__name {{bar.name}}

</template>

<style lang="scss" scoped>
.barz {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

<i18n>
{
  "en": {
    "new-bar": "new bar",
    "description": "a simple app to compute a bar's bill"
  }
}
</i18n>

<script>
import { mapState } from 'vuex'

export default {
  name: 'page-barz',
  data: () => ({
    name: ``,
  }),
  computed: {
    ...mapState({
      barz: state => state.barz.list,
    }),
  },
}
</script>
