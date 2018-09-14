<template lang="pug">
foobarz-main-content(page="barz" title="Barz")
  p {{$t('description')}}
  .barz
    router-link.barz__item(
      v-for="bar in barz"
      :key="bar.id"
      :to="`/barz/${bar.id}`"
    )
      span.barz__name {{bar.name}}
  router-link(to="/barz/new") {{ $t(`new-bar`) }}

</template>

<style lang="scss" scoped>
.barz {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    color: currentColor;
    text-decoration: none;
    display: inline-block;
    border: 1px solid var(--c-primary);
    padding: 1em;
  }
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
